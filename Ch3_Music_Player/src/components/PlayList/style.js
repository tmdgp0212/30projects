import styled from "styled-components"
import {motion} from 'framer-motion'

export const PlayList = styled(motion.div)`
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 3px;
  width: 100%;
  height: 550px;
  background-color: #191825;
  opacity: 0.98;

  &::-webkit-scrollbar{
    width: 3px;
}

/* 스크롤바 막대 설정*/
  &::-webkit-scrollbar-thumb{
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 25px;
}

/* 스크롤바 뒷 배경 설정*/
  &::-webkit-scrollbar-track{
    background-color: transparent;
}

  ul {
    padding: 10px;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      padding: 10px;
      width: 330px;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      cursor: pointer;
      transition: backgroundcolor .2s;

      &:hover {
        background-color: #16151F;
      }

      .cover {
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        
        img {
          display: block;
          width: 100%;
          border-radius: 3px;
        }
      }

      .music__info {
        max-width: 200px;
        flex-grow: 1;

        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .artist {
          margin-top: 3px;
          color: gray;
        }
      }

      .nowPlaying {
        display: flex;
        align-items: center;
        width: 25px;
        height: 25px;
        font-size: 13px;
        color: gray;

        svg {
          width: 25px;
          height: 25px;
        }
      }

      .arrow {
        display: flex;
        align-items: center;
        color: gray;
      }
    }
  }
`