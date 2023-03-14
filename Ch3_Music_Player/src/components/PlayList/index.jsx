import { useContext } from "react";
import { BsChevronCompactRight, BsSoundwave } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RefContext } from "../../App";
import Header from '../Header'
import * as S from './style'

function PlayList() {
  const { showPlayList } = useContext(RefContext)
  const { playlist, currentId } = useSelector((state) => ({
    playlist: state.playlist,
    currentId: state.currentMusicId
  }))

  const dispatch = useDispatch()

  const showVariants = {
    hidden: {y: 570, opacity: 0},
    visible: {y: 0, opacity: 0.95},
  }
  const hiddenVariants = {
    hidden: {y: 0, opacity: 0.95},
    visible: {y: 570, opacity: 0},
  }

  const onClick = (id) => {
    dispatch({type: 'CLICK', id})
  }

  return (
  <S.PlayList 
    initial="hidden"
    animate="visible"
    variants={showPlayList ? showVariants : hiddenVariants}
    transition={{ type: "tween", duration: 0.3 }}
  >
    <Header type={'playlist'} />
    <ul>
    {
      playlist.map((music) => (
        <li key={music.id} onClick={() => onClick(music.id)}>
          <div className="cover">
            <img src={music.cover} alt={music.title} />
          </div>
          <div className='music__info'>
            <p className='title'>{music.title}</p>
            <p className='artist'>{music.artist}</p>          
          </div>
          <span className='nowPlaying'>{currentId === music.id ? (<BsSoundwave />) : music.length}</span>
          <span className="arrow"><BsChevronCompactRight /></span>
        </li>
      ))
    }
    </ul>
  </S.PlayList>
  )
}

export default PlayList