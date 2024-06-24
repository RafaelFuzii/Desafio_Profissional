import { Controller, Delete, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {

    constructor(private chacterService: CharacterService){}

    @Get(':nameCharacter')
    async random(@Param('nameCharacter') nameCharacter: string){
        const character = await this.chacterService.createCharacter(nameCharacter)
        return new HttpException('Random Character Created', HttpStatus.CREATED)
    }

    @Get()
    async getCharacters() {
        const AllCharacter = await this.chacterService.getCharacters()
        return new HttpException('All Character Found',HttpStatus.OK)

    }

    @Get('find/:id')
    async getCharacterById(@Param('id') id: string) {
        const idCharacter = await this.chacterService.getCharacterById(id)
        return new HttpException('All Character Found',HttpStatus.OK)
    }

    @Delete('delete/:id')
    async deleteCharacter(@Param('id') id: string) {
        await this.chacterService.deleteCharacter(id)
        return new HttpException('Character deleted', HttpStatus.NO_CONTENT)
    }

}
