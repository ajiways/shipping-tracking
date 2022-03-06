import { Socket } from 'socket.io';

export interface Connection {
  orderId: number;
  clients: Client[];
}

export interface Client {
  clientId: string;
  socket: Socket;
}
