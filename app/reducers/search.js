import { SEARCH_STARTED, RECIVED_VIDEOS } from '../../constants/ActionConstants';

const initialState = {
  results: [
  ],
  inprogress: false
};

export default function search(state = initialState, action) {
  console.log(action);

  switch (action.type) {
    case SEARCH_STARTED:
      return {
        ...state,
        inprogress: true
      };
    case RECIVED_VIDEOS:
      let { results } = action;

      results = results.map(({ id, snippet }) => ({
        id: id.videoId,
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails.medium.url
      }))
        .filter(({id}) => !!id)
        .filter((_, i) => i <= 6);

      return { ...state, results, inprogress: false };
    default:
      return state;
  }
}
