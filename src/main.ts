import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura multer
  
  // const storage = multer.diskStorage({
  //   destination: './uploads', // ruta donde se guardarán los archivos cargados
  //   filename: (req, file, callback) => {
  //     callback(null, file.originalname);
  //   },
  // });

  // app.use(multer({ storage }).array('files', 10));

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(3000);
}
bootstrap();
