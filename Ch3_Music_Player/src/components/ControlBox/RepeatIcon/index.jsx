import { 
BsShuffle,
BsRepeat,
BsRepeat1 } from "react-icons/bs";

function RepeatIcon({repeat}) {
  switch (repeat) {
    case 'ALL':
      return <BsRepeat />
      
    case 'SHUFFLE':
      return <BsShuffle />

    case 'ONE':
      return <BsRepeat1 />

  }
} 

export default RepeatIcon