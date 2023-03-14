import React from 'react'
import { useSelector } from 'react-redux'
import * as S from './style'

function NowPlaying() {
  const { playlist, currentIdx } = useSelector((state) => ({
    playlist: state.playlist,
    currentIdx: state.currentIdx,
  }))

  const {cover, title, album, artist} = playlist[currentIdx]

  return (
    <S.NowPlaying>
      <div className="cover">
        <img src={cover} alt={title} />
      </div>
      <div className="info">
        <h2 className="title">{title}</h2>
        <p className="artist">{artist}</p>
        <p className="album">{album}</p>
      </div>
    </S.NowPlaying>
  )
}

export default NowPlaying