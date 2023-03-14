import styled, { css } from 'styled-components'

export const Header = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  ${({type}) => type === 'playlist' && css`
    position: sticky;
    top: 0;
    background-color: #191825;
  `}

  div{
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    height: 100%;    

    svg {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  .volume {
    position: relative;
    height: 20px;

    svg {
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      height: 20px;
    }

    .volume-control {
      position: absolute;
      left: -20px;
      top: -10px;
      padding-left: 50px;
      padding-right: 20px;
      height: 40px;
      background-color: rgba(0,0,0,0.7);
      border-radius: 5px;

      &.hidden {
        display: none;
      }
    }
  }

  h1 {
    flex-grow: 1;
    padding: 10px;
    text-align: center;
    cursor: default;
  }
`