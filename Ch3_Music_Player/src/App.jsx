import { createContext, useRef, useState } from 'react'
import styled from 'styled-components'
import Player from './components/Player'
import PlayList from './components/PlayList'

const MeTubeMusic = styled.div`
  overflow: hidden; 
  position: relative;
  padding: 10px;
  width:350px;
  height: 550px;
  border-radius: 10px;
  box-shadow: 0px 0px 25px rgba(0,0,0,0.3);
`

export const RefContext = createContext(null);

function App() {
  const [showPlayList, setShowPlayList] = useState(false)
  const audioRef = useRef();
  
  return (
    <RefContext.Provider value={{audioRef, showPlayList, setShowPlayList}}>
      <MeTubeMusic>
        <Player />
        <PlayList />
      </MeTubeMusic>
    </RefContext.Provider>
  )
}

export default App
