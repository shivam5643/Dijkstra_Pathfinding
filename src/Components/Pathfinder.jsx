import React, { useState, useEffect } from "react";
import "./Pathfinder.css";
import Node from "./Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";


const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const Pathfinder = ({back}) => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
 
  
  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
  }, []);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(
          `node-${node.row}-${node.col}`
        ).className = "node node-shortest-path";
      }, 50 * i);
    }
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(
          `node-${node.row}-${node.col}`
        ).className = "node node-visited";
      }, 10 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    
    

  };

  const resetNodeCSS = () => {
    const allNodes = document.querySelectorAll('.node');
    allNodes.forEach((node) => {
      const [row, col] = node.id.split('-').slice(1).map(Number);
      const defaultClassName = grid[row][col].isFinish
        ? 'node node-finish'
        : grid[row][col].isStart
        ? 'node node-start'
        : 'node';
      node.className = defaultClassName;
    });
  };

  const handleClearGrid = () => {
    const newGrid = getInitialGrid();
    setGrid(newGrid);
    resetNodeCSS(); // Reset the CSS classes
  };



  return (
    <>
      
      <div className="btn1">
      <button onClick={visualizeDijkstra}>Visualize dijkstra</button>
      <button onClick={handleClearGrid}>Clear Grid</button>
      </div>
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => (
              <Node
                key={nodeIdx}
                row={node.row}
                col={node.col}
                isStart={node.isStart}
                isFinish={node.isFinish}
                isVisited={node.isVisited}
                isWall={node.isWall}
                mouseIsPressed={mouseIsPressed}
                onMouseDown={() => handleMouseDown(node.row, node.col)}
                onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                onMouseUp={() => handleMouseUp()}
              />
            ))}
          </div>
        ))}
      </div>
     
    <div className="btn2">
   
    
    <button onClick={back}>Back</button>
    
        
    </div>
      
    </>
  );
};

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

export default Pathfinder;
