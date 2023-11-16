import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Server, Socket } from 'socket.io';
import * as fs from 'fs';
import * as path from 'path';
/**
 * ws监听4000端口
 */
@WebSocketGateway(4000, { allowUpgrades: true, allowEIO3: false, cors: { origin: '*' } })
export class EventGateway {
  roomList = [];
  @WebSocketServer()
  server: Server;
  socket: Map<string, Socket> = new Map<string, Socket>();
  adminNum: string;
  constructor(private readonly eventService: EventService) {}
  handleConnection(@ConnectedSocket() socket: Socket) {
    socket.join('-1');
    console.log('与服务器成功建立链接');
  }
  @SubscribeMessage('connect')
  create(@MessageBody() createEventDto: CreateEventDto) {
    console.log(123);
    return this.eventService.create(createEventDto);
  }

  @SubscribeMessage('findAllEvent')
  findAll() {
    this.server.emit('tip', '测试消息11');
    return this.eventService.findAll();
  }

  @SubscribeMessage('findOneEvent')
  findOne(@MessageBody() id: number) {
    const fileName = 'long.mp3';
    const buffer = fs.createReadStream(path.join(process.cwd(), `/public/static/${fileName}`));
    buffer.on('data', (chunk: Buffer) => {
      if (chunk instanceof Buffer) {
        this.server.emit('stream', chunk);
      }
    });
  }

  /**
   * 用户加入房间
   * @param updateEventDto
   * @param client
   */
  @SubscribeMessage('join')
  join(@MessageBody() updateEventDto: any, @ConnectedSocket() client: Socket) {
    const { userId } = updateEventDto;
    this.adminNum = userId;
    if (!this.socket.get(userId)) {
      this.socket.set(userId, client);
    }
  }

  /**
   * 用户离开房间
   * @param updateEventDto
   */
  @SubscribeMessage('leave')
  leave(@MessageBody() updateEventDto: UpdateEventDto) {
    return this.eventService.update(updateEventDto.id, updateEventDto);
  }

  /**
   * 连接断开
   */
  @SubscribeMessage('disconnect')
  disconnect() {}

  /**
   * 用户发送offer
   * @param message
   * @param client
   */
  @SubscribeMessage('offer')
  offer(@MessageBody() message, @ConnectedSocket() client: Socket) {
    // this.eventService.handleOffer(client, message)
    // 获取当前接入客户端的socket信息
    const { otherId } = message;
    const clientSocket = this.socket.get(otherId);
    clientSocket.emit('offer', message);
  }

  /**
   * 用户发送answer
   * @param message
   * @param client
   */
  @SubscribeMessage('answer')
  answer(@MessageBody() message, @ConnectedSocket() client: Socket) {
    // this.eventService.handleAnswer(client, message)
    const { userId } = message;
    const adminClient = this.socket.get(userId);
    adminClient.emit('answer', message);
  }

  @SubscribeMessage('otherJoin')
  otherJoin(@MessageBody() message: any, @ConnectedSocket() client: Socket) {
    const { userId } = message;
    if (!this.socket.get(userId)) {
      this.socket.set(userId, client);
    }
    const adminSocket = this.socket.get(this.adminNum);
    adminSocket.emit('otherJoin', message);
    // this.server.sockets.to('-1').emit('otherJoin', message)
  }
  @SubscribeMessage('candidate')
  candidate(@MessageBody() message, @ConnectedSocket() client: Socket) {
    client.to('-1').emit('candidate', message);
  }
  @SubscribeMessage('removeEvent')
  remove(@MessageBody() id: number) {
    return this.eventService.remove(id);
  }
}
