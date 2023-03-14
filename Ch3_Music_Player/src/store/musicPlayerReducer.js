import playlist from './data'

const randomIdx = Math.floor(Math.random() * playlist.length)
const repeatMode = ['ALL', 'SHUFFLE', 'ONE']

const getRandomNum = (excludeNum) => {
  const randomNum = Math.floor(Math.random() * playlist.length);
  return randomNum === excludeNum ? getRandomNum(excludeNum) : randomNum
}

export const initialState = {
  playlist,
  currentMusicId: playlist[randomIdx].id,
  currentIdx: randomIdx,
  playing: false,
  repeat: 'ALL', // ONE SHUFFLE
}


export default function musicPlayerReducer(state = initialState, action){
  switch(action.type) {
    case 'PLAY':
      return {
        ...state,
        playing: true
      }
    case 'PAUSE':
      return {
        ...state,
        playing: false
      }
    case 'NEXT':
      const nextIdx = state.repeat === 'SHUFFLE' ? 
      getRandomNum(state.currentIdx)
      : (state.currentIdx + 1) % state.playlist.length
      return {
        ...state,
        currentIdx: nextIdx,
        currentMusicId: playlist[nextIdx].id
      }
    case 'PREV':
      const prevIdx = state.repeat === 'SHUFFLE' ? 
      getRandomNum(state.currentIdx)
      : (state.currentIdx - 1 + state.playlist.length) % state.playlist.length
      return {
        ...state,
        currentIdx: prevIdx,
        currentMusicId: playlist[prevIdx].id
      }
    case 'REPEAT':
      return {
        ...state,
        repeat: repeatMode[((repeatMode.indexOf(state.repeat)) + 1) % repeatMode.length]
      }
    case 'CLICK':
      return {
        ...state,
        currentIdx: state.playlist.findIndex(obj => obj.id === action.id),
        currentMusicId: action.id,
      }
    
    default:
       return state
  }
}