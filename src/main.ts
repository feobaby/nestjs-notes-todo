import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NoteModule } from "../src/modules/note.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");

  const options = new DocumentBuilder()
    .setTitle("Notes todo app")
    .setDescription(
      "A documentation for notes"
    )
    .setVersion("1.0")
    .addTag("Notes")
    .build();
  const appDocument = SwaggerModule.createDocument(app, options, {
    include: [NoteModule]
  });
  SwaggerModule.setup("api", app, appDocument);
  await app.listen(3000);
}
bootstrap();
