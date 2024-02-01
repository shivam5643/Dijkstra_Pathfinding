import './page1.css';
const Page1 = ({toogle}) => {
    
  return (
    
    <div className="page1">
        <div className="nav">
        <h1>Welcome to pathfinding Visualizer!</h1>
        </div>
       <div className='content'>
        <div className='text'>
        <h2>
            This short tutorial will walk you through all of the features of this application.  
        </h2>
        <h3>
        At its core, pathfinding algorithm seeks to 
        find the shortest path between two points.
        This application visualizes the Dijkstra's pathfinding algorithms in action,and more!
        </h3>
        <div className='image'>
           <img src="path.jpeg" alt="" />
        </div>
        <p>
            The algorithm on this application are adapted for a 2D grid ,
            where 90 degree turns have a "cost" of 1 and movements from a node to another node 
            have a "cost" of 1.
        </p>
        
        </div>
        
        <div className='btn'>
            <button onClick={toogle}> Visit Application </button>
        </div>
       </div>
    </div>
  )
}

export default Page1