import React, { useRef, useState, useContext, useCallback } from 'react'
import * as S from './style'
import { 
  BsFillPlayFill,
  BsPauseFill,
  BsSkipBackwardFill,
  BsSkipForwardFill,
  BsMusicNoteList } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { RefContext } from '../../App';
import RepeatIcon from './RepeatIcon';


function ControlBox() {
  const progressBar = useRef();

  const {audioRef, setShowPlayList} = useContext(RefContext)

  const [currentTime, setCurrentTime] = useState('00:00')
  const [duration, setDuration] = useState('00:00')

  const { playlist, currentIdx, playing, repeat } = useSelector((state) => ({
    playlist: state.playlist,
    currentIdx: state.currentIdx,
    playing: state.playing,
    repeat: state.repeat
  }))
  
  const dispatch = useDispatch()

  const onClickPlay = () => {audioRef.current.play()}
  const onClickPause = () => {audioRef.current.pause()}
  const onEnded = useCallback (() => {
    if ( repeat === 'ONE') {
      audioRef.current.currentTime = 0
      audioRef.current.play();
    } else {
      dispatch({type: 'NEXT'})
    }
  }, [repeat, dispatch])

  const ontimeupdate = (evt) => {
    if(evt.target.readyState === 0) return

    const currentTime = evt.target.currentTime;
    const duration = evt.target.duration;
    const progressBarWidth = (currentTime / duration) * 100
    progressBar.current.style.width = `${progressBarWidth}%`

    setCurrentTime(getTime(currentTime))
    setDuration(getTime(duration))
  }

  const onClickProgress = (evt) => {
    const progressBarWidth = evt.currentTarget.clientWidth
    const offsetX = evt.nativeEvent.offsetX
    const duration = audioRef.current.duration
    audioRef.current.currentTime = (offsetX / progressBarWidth) * duration
  }

  const getTime = (time) => {
    const minute = String(parseInt(time/60)).padStart(2, '0')
    const seconds = String(parseInt(time % 60)).padStart(2, '0')

    return `${minute}:${seconds}`
  }

  return (
    <S.ControlBox>
      <div className="progress">
        <span className='currentTime timeline'>{currentTime}</span>
        <div className="progress-bar" onMouseDown={onClickProgress}>
          <span ref={progressBar}></span>
        </div>
        <span className='duration timeline'>{duration}</span>
        <audio 
          src={playlist[currentIdx].src} 
          ref={audioRef}
          onPlay={() => dispatch({type: 'PLAY'})}
          onPause={() => dispatch({type: 'PAUSE'})}
          onEnded={onEnded}
          onTimeUpdate={ontimeupdate}
          autoPlay
        ></audio>
      </div>
      <div className="control-btns">
        <span onClick={() => {dispatch({type: 'REPEAT'})}}>
          <RepeatIcon repeat={repeat} />
        </span>
        <span onClick={() => dispatch({type: 'PREV'})}><BsSkipBackwardFill /></span>

        {playing ? 
          <span onClick={onClickPause}><BsPauseFill /></span>
          : <span onClick={onClickPlay}><BsFillPlayFill /></span>
        }
        
        <span onClick={() => dispatch({type: 'NEXT'})}><BsSkipForwardFill /></span>
        <span onClick={() => setShowPlayList(true)}><BsMusicNoteList /></span>
      </div>
    </S.ControlBox>
  )
}

export default ControlBox