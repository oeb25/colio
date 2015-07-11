import http from 'http';
import socketio from 'socket.io';
import { ROOM_UPDATE, ADD_VIDEO } from '../constants/ActionConstants';

const app = http.createServer();
const io = socketio(app);

app.listen('3001');

io.on('connection', socket => {
  const id = socket.id;

  console.log(io.sockets.connected[id] == socket);

  setTimeout(() => socket.emit(ROOM_UPDATE, { type: '@@test', msg: 'Hello there!' }), 1000);

  socket.on(ADD_VIDEO, video => io.emit(ROOM_UPDATE, {
    video,
    type: ADD_VIDEO
  }));

  socket.on('subscribe', channel => console.log(channel));
});
