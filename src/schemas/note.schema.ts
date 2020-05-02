import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const NoteSchema = new Schema({
    name: String,
    description: String,
    tags: {
        type: String,
        enum: ["Personal", "Travel", "Life", "Work"],
    },
    createdAt: { type: Date, default: Date.now }
});