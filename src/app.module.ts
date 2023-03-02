import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PHubController } from "./controllers/p-hub/p-hub.controller";
import { PHubService } from "./services/p-hub/p-hub.service";

@Module({
  imports: [],
  controllers: [AppController, PHubController],
  providers: [AppService, PHubService],
})
export class AppModule {}
