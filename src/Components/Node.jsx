import './Node.css'
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { FaChildReaching } from "react-icons/fa6";

const Node = ({
  col,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  row,
 }) => {
  const extraClassName = 
      isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    :  isWall
    ?  'node-wall'
    : '';
  return (
    <div 
       id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()} 
    >

    {(row==10 && col==5)? <IoArrowForwardCircleSharp className='start' />: "  " }
    {(row==10 && col==35)? <FaChildReaching className='start' />: "  " }
    
    </div>
  )
}

export default Node