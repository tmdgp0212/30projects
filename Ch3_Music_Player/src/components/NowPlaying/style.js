import styled from 'styled-components'

export const NowPlaying = styled.div`
  padding: 10px;
  cursor: default;
  
 .cover {
  width: 250px;
  height: 250px;
  margin: 0 auto 10px;

  img {
    display: block;
    width: 100%;
    border-radius: 5px;
  }
 }

 .info {
  padding: 10px;
  text-align: center;

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
  }

  .album {
    color: gray;
    font-size: 13px;
  }

  .artist {
    margin-top: 5px;
    line-height: 1.5;
  }
 }
`