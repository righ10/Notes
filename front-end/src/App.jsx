import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import CretePage from './pages/CretePage'
import NodeDetailPage from './pages/NodeDetailPage'



const App = () => {
  return (
    <div className='relative h-full w-full'>
      <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
      [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00ff9d40_100%)]'/>
      
    
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CretePage/>}/>
        <Route path='/note/:id' element={<NodeDetailPage/>}/>
        
      </Routes>
    </div>
  )
}

export default App