import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { userInfo } from 'os';
import { Server, Socket } from 'socket.io';

@Injectable()
export class EventService {
  roomList = [];
  maxUserCount = 5;
  userInfo = new Map();
  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }

  handleJoin(socket, data: any) {
    let roomInfo = this.roomList.find((room) => room.id === data.roomId);
    if (!roomInfo) {
      roomInfo = { id: data.roomId, userList: [], admin: data.userId };
      this.roomList.push(roomInfo);
    }
    if (roomInfo.userList.length > this.maxUserCount) {
      socket.emit('message', '房间人数已满，请稍后再试');
      return;
    }
    const find = roomInfo.userList.find((userInfo) => userInfo.userId === data.userId);
    find && socket.emit('error', '用户已经在房间中');
    // socket.sockets.userId = data.userId
    // socket.to('-1').emit('join',data)
    // 通知自己加入房间成功
    socket.emit('joined', data);
  }
  handleAnswer(socket: Socket, data: any) {
    socket.to('-1').emit('answer', data);
  }
  handleOffer(socket: Socket, data: any) {
    const { userId, sdp } = data;
    this.userInfo.set(userId, sdp);
    socket.to('-1').emit('offer', data);
  }
}
