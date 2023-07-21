import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from "@nestjs/websockets";
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {Server} from 'socket.io'
import * as  fs from 'fs'
import * as path from 'path'
/**
 * ws监听4000端口
 */
@WebSocketGateway(4000, {allowUpgrades: true, allowEIO3: false, cors: { origin: "*" }})
export class EventGateway {
  @WebSocketServer()
  server: Server
  constructor(private readonly eventService: EventService) {}
  handleConnection() {
    this.server.on('connection', () => {
      console.log('与服务器成功建立链接');
    })
  }
  @SubscribeMessage('connect')
  create(@MessageBody() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @SubscribeMessage('findAllEvent')
  findAll() {
    this.server.emit('tip','测试消息11')
    return this.eventService.findAll();
  }

  @SubscribeMessage('findOneEvent')
  findOne(@MessageBody() id: number) {
    const fileName = 'long.mp3'
    const buffer = fs.readFileSync(path.join(process.cwd(),`/public/static/${fileName}`));
    // setInterval(() =>
      this.server.emit('stream', buffer)
    // }, 3000)
    // return this.eventService.findOne(id);
  }

  @SubscribeMessage('updateEvent')
  update(@MessageBody() updateEventDto: UpdateEventDto) {
    return this.eventService.update(updateEventDto.id, updateEventDto);
  }

  @SubscribeMessage('removeEvent')
  remove(@MessageBody() id: number) {
    return this.eventService.remove(id);
  }
}
