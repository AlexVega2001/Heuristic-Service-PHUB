import { Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { PHubService } from 'src/services/p-hub/p-hub.service';

@Controller('p-hub')
export class PHubController {
  constructor(private _pHubService: PHubService) {}

  //EndPoint post para receptar varios archivos txt
  @Post('solution')
  @UseInterceptors(FilesInterceptor('files'))
  solution(@UploadedFiles() files): any {
    let response = {};

    response = this._pHubService.getSolutionsPhub(files);

    // Devuelve la respuesta a la petición
    return response;
  }
}
