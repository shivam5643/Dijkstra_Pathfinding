import { useState } from 'react'
import './App.css'
import Pathfinder from './Components/Pathfinder'
import Page1 from './Components/Page1';

function App() {
  const [togggle,setTogggle]=useState(false);
  
   const toggleClick=()=>{
    setTogggle(!togggle);
  }
 
 return (
    <div className='App'>
    {togggle? <Pathfinder back={toggleClick}/> : <Page1 toogle={toggleClick}/>  }
   

     
      
    </div>
  )
}

export default App
