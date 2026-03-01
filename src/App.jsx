import { useState } from 'react'

import './App.css'
import CivicALogin from './Pages/Login/CivicAidLogin'
import  Adminlogin from './Pages/Admin/Admin'
import WasteG from './Pages/WasteGuide/WasteG'

function App() {
  

  return (
    <>
      <CivicALogin/>
      <Adminlogin/>
      <WasteG/>
    </>
  )
}

export default App
