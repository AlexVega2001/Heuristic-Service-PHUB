import { ProblemI, ServerI } from "src/interfaces/phub.interface";

export class Server {
  private servers: ServerI[] = [];

  public get Servers(): ServerI[] {
    return this.servers;
  }

  constructor() {}

  assignedServer(problem: ProblemI): ProblemI {
    for (let i = 0; i < problem.totalServers; i++) {

      //Obtenemos un indice aleatorio del 0 al número total de nodos existentes
      const randomIndex = this.getRandomInt(problem.nodes.length);

      //Agregamos como servidor el nodo escogido aleatoriamente
      this.servers.push({
        id: problem.nodes[randomIndex].id,
        capacity: problem.maxCapacityServer,
        availableCapacity: problem.maxCapacityServer,
        assignedClients: [],
        totalDistance: 0,
        coordinates: {
          x: problem.nodes[randomIndex].coordinates.x,
          y: problem.nodes[randomIndex].coordinates.y,
        },
      });

      //Filtramos el nodo escogido aleatoriamente, para que solo aparezca como servidor
      problem.nodes = [
        ...problem.nodes.filter((element, index) => index !== randomIndex),
      ];
    }

    return { ...problem };
  }

  allServerBusy(server: ServerI[], currentDemand: number): boolean {
    return (
      server.filter((res) => res.availableCapacity >= currentDemand).length ===
      0
    );
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}
