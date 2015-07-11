import { LEAVE_ROOM, JOIN_ROOM, ADD_VIDEO, SET_VIDEO } from '../../constants/ActionConstants';

const initialState = false;
const dummyData = require('./dummydata');

console.log('dummyData:', dummyData);

export default function room(state = initialState, action) {
  switch (action.type) {
    case JOIN_ROOM:
      return {
        id: action.roomId,
        videos: dummyData,
        current: 0
      };
    case LEAVE_ROOM:
      return initialState;
    case ADD_VIDEO:
      return {
        ...state,
        videos: [...state.videos, action.video]
      };
    case SET_VIDEO:
      return {
        ...state,
        current: action.id
      };
    default:
      return state;
  }

  return initialState;
}
