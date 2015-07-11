import { RECIVED_VIDEOS, SEARCH_STARTED, ADD_VIDEO } from '../../constants/ActionConstants';

const key = 'AIzaSyA85VdtU6P4oyQQzxyKTECzZ9wcMJL0uYk';

const getVideo = id => fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${key}`);
const getVideos = q => fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&maxResults=20&key=${key}`);

const genID = () => Math.floor(Math.random() * 16777216).toString(16);

const handleError = data => {
  if (!data.ok) throw new Error(data.error);
  return data;
};

export function searchVideos(query) {
  const id = genID();

  return dispatch => {
    dispatch({
      id,
      type: SEARCH_STARTED
    });

    getVideos(query)
      .then(handleError)
      .then(data => data.json())
      .then(data => dispatch({
        id,
        results: data.items,
        type: RECIVED_VIDEOS
      }));
  };
}

export function addVideo(video) {
  return {
    video,
    type: ADD_VIDEO
  };
}
