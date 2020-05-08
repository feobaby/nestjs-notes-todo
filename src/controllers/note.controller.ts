import { Controller, Res, HttpStatus, Post, Get, Param, Body, Patch, Query, Delete } from "@nestjs/common";
import { NoteService } from "../services/note.service";
import { CreateNoteDTO } from "../dtos/note.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Notes")
@Controller('note')
export class NoteController {
    constructor(private noteService: NoteService) { }

    @ApiResponse({ status: 201 })
    @Post('/add')
    async createANote(@Res() res, @Body() createNoteDTO: CreateNoteDTO) {
        const note = await this.noteService.createANote(createNoteDTO);
        return res.status(HttpStatus.CREATED).json({
            status: 201,
            message: "Successful!",
            data: note
        })
    }

    @ApiResponse({ status: 200 })
    @Get('/all')
    async getAllNotes(@Res() res) {
        const notes = await this.noteService.getAllNotes();
        return res.status(HttpStatus.OK).json({
            status: 200,
            data: notes
        })
    }

    @ApiResponse({ status: 200 })
    @Get("/:noteId")
    async getANote(@Res() res, @Param("noteId") _id: string) {
        const note = await this.noteService.getANote(_id);
        if (!note)
            return res
                .status(HttpStatus.NOT_FOUND)
                .json({ status: 404, error: "Not found!" });
        return res.status(HttpStatus.OK).json({ status: 200, data: note });
    }

    @ApiResponse({ status: 200 })
    @Patch('/update/:noteId')
    async updateCustomer(@Res() res, @Body() createNoteDTO: CreateNoteDTO, @Param("noteId") _id: string) {
        const note = await this.noteService.updateANote(_id, createNoteDTO);
        if (!note)
            return res
                .status(HttpStatus.NOT_FOUND)
                .json({ status: 404, error: "Not found!" });
        return res.status(HttpStatus.OK).json({
            status: 200,
            message: 'Successful!',
            note
        });
    }

    @ApiResponse({ status: 200 })
    @Delete('/delete/:noteId')
    async deleteCustomer(@Res() res, @Param('noteId') _id) {
        const note = await this.noteService.deleteANote(_id);
        if (!note)
            return res
                .status(HttpStatus.NOT_FOUND)
                .json({ status: 404, error: "Not found!" });
        return res.status(HttpStatus.OK).json({
            status: 200,
            message: 'Successful!',
        })
    }

}