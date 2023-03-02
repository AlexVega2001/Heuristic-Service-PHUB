import { NodeI, ServerI } from "src/interfaces/phub.interface";

export class Client {
  constructor() {}

  calculateDistance(server: ServerI, client: NodeI): number {
    return Math.sqrt(
      Math.pow(client.coordinates.y - server.coordinates.y, 2) +
        Math.pow(client.coordinates.x - server.coordinates.x, 2),
    );
  }
}
