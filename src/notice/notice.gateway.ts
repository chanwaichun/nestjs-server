import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
// @ts-ignore
import { Server, Socket } from '@nestjs/platform-socket.io';
import { Injectable } from '@nestjs/common';
@Injectable()
@WebSocketGateway(80, { namespace: '/notice', cors: true }) // 监听在3001端口，并设置命名空间为 '/chat'
export class NoticeGateway {
  @WebSocketServer()
  server: Server;
  clientId: string;
  // 监听客户端发送的消息
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    console.log('Message received:', payload);
    // 向所有连接的客户端广播消息
    this.server.emit('message', payload);
  }
  sendMessageToClient(message: string) {
    this.server.to(this.clientId).emit('message', message);
  }
  // 监听客户端连接
  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    this.clientId = client.id;
  }

  // 监听客户端断开连接
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
}
