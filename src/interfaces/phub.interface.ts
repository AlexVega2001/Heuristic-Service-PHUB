//Primera linea Número total de nodos
//Segunda linea Número total de servidores
//Tercero capacidad maxima de cada servidor

export interface ProblemI {
  totalNodes: number;
  totalServers: number;
  maxCapacityServer: number;

  nodes: NodeI[];
}

export interface NodeI {
  id: number;
  coordinates: CoordinateI;
  demand: number;
  distance?: number;
}

export interface CoordinateI {
  x: number;
  y: number;
}

export interface ServerI {
  id: number;
  capacity: number;
  coordinates: CoordinateI;
  availableCapacity: number;
  totalDistance: number;
  assignedClients: NodeI[];
}

export interface SolutionI {
  servers: ServerI[];
  cost: number;
}
