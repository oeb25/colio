import { SET_VIDEO, LEAVE_ROOM, JOIN_ROOM } from '../../constants/ActionConstants';

export function joinRoom(roomId) {
  return {
    roomId,
    type: JOIN_ROOM
  };
}

export function createRoom() {

}

export function setVideo(id) {
  return {
    id,
    type: SET_VIDEO
  };
}

export function leaveRoom() {
  return {
    type: LEAVE_ROOM
  };
}
