import { Injectable } from "@nestjs/common";
import { Client } from "src/class/client.class";
import { Server } from "src/class/Server.class";
import { ProblemI, ServerI, SolutionI } from "src/interfaces/phub.interface";

@Injectable()
export class PHubService {
  getSolutionsPhub(files: any): any {
    let mapData: ProblemI;

    let bestSolution: any;

    //Iteramos los archivos que sube el cliente
    files.forEach((file) => {
      //obtenemos el contenido de los text
      const content: string = file.buffer.toString("utf8");

      //Obtenemos los datos mapeados
      mapData = { ...this.mappingData(content) };

      //Obtenemos la mejor solución
      bestSolution = { ...this.getBestSolution(mapData, 1000) };
    });

    return { message: "Transacción Existosa", data: bestSolution };
  }

  /**
   * Función para obtener la mejor solución
   * @param problem
   * @param iterations
   * @returns
   */
  private getBestSolution(problem: ProblemI, iterations: number): SolutionI {
    let solutions: SolutionI[] = [];

    for (let i = 0; i < iterations; i++) {
      //Asignamos los clientes a los servidores bajo las restricciones establecidas
      const servers: ServerI[] = [
        ...this.assignClientToServers({ ...problem }),
      ];

      //Agregamos la solución en el arrays de soluciones
      solutions.push({
        cost: servers.reduce(
          (acc, server) => Number((acc + server?.totalDistance).toFixed(2)),
          0,
        ),
        servers: [...servers],
      });
    }

    return {
      solucionOptima: { ...this.solutionOptimal(solutions) },
      solutiones: { ...solutions },
    } as any;
  }

  private solutionOptimal(solutions: SolutionI[]): SolutionI {
    return solutions.reduce((prev, current) =>
      prev.cost < current.cost ? prev : current,
    );
  }

  /**
   * Función para mapear los datos del txt
   * @param content
   * @returns
   */
  private mappingData(content: string): ProblemI {

    let data = content.trim().split(/\n/g);

    let response: ProblemI = {
      totalNodes: Number(data[0]?.split(" ")[0]), //Primera linea Número total de nodos
      totalServers: Number(data[0]?.split(" ")[1]), //Segunda linea Número total de servidores
      maxCapacityServer: Number(data[0]?.split(" ")[2]), //Tercero capacidad maxima de cada servidor
      nodes: data.slice(1).map((res) => {
        return {
          id: Number(res?.trim()?.split(" ")[0]),
          coordinates: {
            x: Number(res?.trim()?.split(" ")[1]),
            y: Number(res?.trim()?.split(" ")[2]),
          },
          demand: Number(res?.trim()?.split(" ")[3]),
        };
      }),
    };

    return { ...response };
  }

  /**
   * Función para asignar los clientes a servidores, según los parámetros indicados
   * @param problem
   * @returns
   */
  private assignClientToServers(problem: ProblemI): ServerI[] {
    let server = new Server();
    let client = new Client();

    //Asignar Aleatoriamente los servidores
    problem = { ...server.assignedServer(problem) };

    //Asignación de clientes a un servidor
    problem.nodes.forEach((element) => {
      let isAssigned = false;

      while (!isAssigned) {
        //Obtenemos un indice aleatorio del 0 al número total de servidores existentes
        const indexRandomServer: number = server.getRandomInt(
          server.Servers.length,
        );

        //Verificar espacio en los servidores, para el cliente actual
        if (server.allServerBusy(server.Servers, element.demand)) {
          isAssigned = true;

          break;
        }

        //Validar que la capacidad no haya sido excedida
        if (
          server.Servers[indexRandomServer].availableCapacity -
            element.demand >=
          0
        ) {
          //Si no ha sido excedida, se empieza a asignar como cliente

          server.Servers[indexRandomServer].assignedClients.push(element);

          //Y actualizamos la nueva capacidad
          server.Servers[indexRandomServer].availableCapacity =
            server.Servers[indexRandomServer].availableCapacity -
            element.demand;

          //Calculamos la distancia
          element.distance = client.calculateDistance(
            server.Servers[indexRandomServer],
            element,
          );

          //Acumulamos las distancias
          server.Servers[indexRandomServer].totalDistance =
            server.Servers[indexRandomServer]?.totalDistance + element.distance;

          isAssigned = true;
        }
      }
    });

    return [...server.Servers];
  }
}
