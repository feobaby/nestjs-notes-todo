import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Note } from "../interfaces/note.interface";
import { CreateNoteDTO } from "../dtos/note.dto";

@Injectable()
export class NoteService {
    constructor(@InjectModel("Note") private readonly noteModel: Model<Note>) { }
    async createANote(createNoteDTO: CreateNoteDTO): Promise<Note> {
        const newNote = await this.noteModel(createNoteDTO);
        return newNote.save();
    }

    async getAllNotes(): Promise<Note[]> {
        const notes = await this.noteModel.find().exec();
        return notes;
    }

    async getANote(noteId): Promise<Note> {
        const note = await this.noteModel.findById(noteId).exec();
        return note;
    }

    async updateANote(_id, createNoteDTO: CreateNoteDTO): Promise<Note> {
        const note = await this.noteModel.findByIdAndUpdate(_id, createNoteDTO, { new: true });
        return note;
    }

    async deleteANote(_id): Promise<any> {
        const note = await this.noteModel.findByIdAndRemove(_id);
        return note;
    }
}