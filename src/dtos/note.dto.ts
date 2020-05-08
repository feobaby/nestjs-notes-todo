import { ApiProperty } from "@nestjs/swagger";

export class CreateNoteDTO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    tags: string;
}