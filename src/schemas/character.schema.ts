import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Character{

    @Prop({ required: true })
    name: string
    
    @Prop({ required: true })
    class: string

    @Prop({
        type: Map,
        of: Number,
        required: true,
        default: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,
        },
      })
      attributes: Record<string, number>;

    @Prop({ required: true })
    aligment: string
    
    @Prop({ required: true })
    items: string[]
}

export const characterSchema = SchemaFactory.createForClass(Character)

