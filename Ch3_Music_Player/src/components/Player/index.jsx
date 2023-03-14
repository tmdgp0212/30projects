import React from 'react'
import { useSelector } from 'react-redux'
import ControlBox from '../ControlBox'
import Header from '../Header'
import NowPlaying from '../NowPlaying'
import * as S from './style'

function Player() {
  const { playlist, currentIdx } = useSelector((state) => ({
    playlist: state.playlist,
    currentIdx: state.currentIdx,
  }))

  return (
    <S.Player bg={playlist[currentIdx].cover}>
    <Header type={"player"} />
    <NowPlaying />
    <ControlBox />

    <div className="background"></div>
  </S.Player>
  )
}

export default Player