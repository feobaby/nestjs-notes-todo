import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteController } from "../controllers/note.controller";
import { NoteService } from "../services/note.service";
import { NoteSchema } from "../schemas/note.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])
    ],
    controllers: [NoteController],
    providers: [NoteService]
})
export class NoteModule { }