import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpStatus } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { CreateNoteDTO } from "../src/dtos/note.dto";
import * as mongoose from "mongoose";

describe("E2E Tests for NOTE Endpoints", () => {
    let app: INestApplication;

    beforeEach(async () => {
        jest.setTimeout(10000);
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async done => {
        await mongoose.disconnect(done);
    });

    it("should create a note", () => {
        const note: CreateNoteDTO = {
            name: "My Travel Plans for 2020",
            description: "Plans to travel to Kenya",
            tags: "Travel",
        };
        return request(app.getHttpServer())
            .post("/note/add")
            .set("Accept", "application/json")
            .send(note)
            .expect(HttpStatus.CREATED);
    });
    it("should update a note", () => {
        const note: CreateNoteDTO = {
            name: "My Travel Plans for 2020",
            description: "Plans to travel to Kenya",
            tags: "Work",
        };
        return request(app.getHttpServer())
            .patch("/note/update/5ead5c1a43ace404e06a7408")
            .set("Accept", "application/json")
            .send(note)
            .expect(HttpStatus.OK);
    });
    it("should get all notes", () => {
        return request(app.getHttpServer())
            .get("/note/all")
            .set("Accept", "application/json")
            .expect(HttpStatus.OK);
    });
    it("should get a note", () => {
        return request(app.getHttpServer())
            .get("/note/5ead5c1a43ace404e06a7408")
            .set("Accept", "application/json")
            .expect(HttpStatus.OK);
    });
    it("should delete a note", () => {
        return request(app.getHttpServer())
            .delete("/note/delete/5ead5c1a43ace404e06a7408")
            .set("Accept", "application/json")
            .expect(HttpStatus.OK);
    });
});
