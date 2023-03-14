import React, { useContext, useEffect, useRef } from 'react'
import * as S from './style'
import { BsVolumeUpFill } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { RefContext } from '../../App';

function Header({type}) {
  const {audioRef, setShowPlayList} = useContext(RefContext)
  const controller = useRef()

  const toggleVolumeController = () => {
    controller.current.classList.toggle('hidden')
  }

  const onChangeVolume = (volume) => {
    audioRef.current.volume = volume
  }

  useEffect(() => {
    onChangeVolume(0.1)
  },[])

  return (
    <S.Header type={type}>
      <div className="left-button">
        {type === 'player' ? 
        (
          <div className='volume'>
            <div className="volume-control hidden" ref={controller}>
              <input type="range" defaultValue={0.1} min={0} max={1} step={0.01} onChange={(e) => {onChangeVolume(e.target.value)}} />
            </div>
            <BsVolumeUpFill onClick={toggleVolumeController} />
          </div>
        ) : ''}
      </div>
      <h1>{type === 'player' ? 'Now Playing...' : 'Play List' }</h1>
      <div className="right-button">
        {
          type === 'playlist' ? 
          <FiX onClick={() => setShowPlayList(false)} /> : ''
        }
      </div>
    </S.Header>
  )
}

export default Header