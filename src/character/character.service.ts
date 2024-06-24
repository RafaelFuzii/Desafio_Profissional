import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { Character } from 'src/schemas/character.schema';

@Injectable()
export class CharacterService {
    constructor(@InjectModel(Character.name) private characterModel: Model<Character>){}

    async createCharacter(nameCharacter: string): Promise<Character>{
        const possibleClasses = ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"]
        const randomClass = possibleClasses[Math.floor(Math.random() * possibleClasses.length)]
        const apiDD = await axios.get(`https://www.dnd5eapi.co/api/classes/${randomClass}`)

        const attributes = {
            strength: Math.floor(Math.random() * 16) + 3,
            dexterity: Math.floor(Math.random() * 16) + 3,
            constitution: Math.floor(Math.random() * 16) + 3,
            intelligence: Math.floor(Math.random() * 16) + 3,
            wisdom: Math.floor(Math.random() * 16) + 3,
            charisma: Math.floor(Math.random() * 16) + 3,
        }

        const possibleAlignment = ["chaotic-neutral", "chaotic-evil", "chaotic-good", "lawful-neutral", "lawful-evil", "lawful-good", "neutral", "neutral-evil", "neutral-good"]
        const randomAligment = possibleAlignment[Math.floor(Math.random() * possibleAlignment.length)]

        const startEquipmentName =  await apiDD.data.starting_equipment.map((item: any)=> item.equipment.name)
        const startEquipmentOptions =  await apiDD.data.starting_equipment_options;
        
        const equipmentRandom = []
        startEquipmentName.forEach((name:string) => equipmentRandom.push(name))
        if(startEquipmentOptions){
            startEquipmentOptions.forEach((options: any) => {
                if (options.from?.options) {
                    options.from.options.forEach((equipment: any) => {
                      if (equipment.option_type === 'counted_reference' && equipment.of?.name) {
                        equipmentRandom.push(equipment.of.name);
                      }
                    });
                }
            })
        }

        const randomCharacter = new this.characterModel({
            name: nameCharacter,
            class: randomClass,
            attributes:{
                strength: attributes.strength,
                dexterity: attributes.dexterity,
                constitution: attributes.constitution,
                intelligence: attributes.intelligence,
                wisdom: attributes.wisdom,
                charisma: attributes.charisma
            },
            aligment: randomAligment,
            items: equipmentRandom

        })

        await randomCharacter.save()
        

        return randomCharacter
    }

    async getCharacters() {
        return await this.characterModel.find();
    }

    async getCharacterById(id: string) {
        const character = await this.characterModel.findOne({ _id: id });
        if (!character) {
            throw new NotFoundException('Character not found');
        }
        return character;
    }

    async deleteCharacter(id: string) {
        await this.getCharacterById(id);
        return await this.characterModel.deleteOne({ _id: id });
    }
}

