import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteModule } from './modules/note.module';
import "dotenv/config";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      }),
    NoteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }