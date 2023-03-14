import styled from "styled-components";

export const ControlBox = styled.div`

.progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  padding: 10px 15px 20px;
  
  .progress-bar {
    flex-grow: 1;
    overflow: hidden;
    height: 5px;
    background-color: rgba(255,255,255,0.1);
    border-radius: 5px;

    span {
      display: block;
      width: 0;
      height: 5px;
      background-color: #fff;
    }
  }

  .timeline {
    overflow: visible;
    width: 30px;
    color: gray;
    font-size: 12px;
    text-align: center;
    cursor: default;
  }
}

.control-btns {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  padding: 20px;

  span svg {
    font-size: 18px;
    cursor: pointer;
  }
}
`