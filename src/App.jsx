import { useState } from 'react'
import DustbinMap from "./Components/Map/DustbinMap";
import './App.css'
import CivicALogin from './Pages/Login/CivicAidLogin'
import  Adminlogin from './Pages/Admin/Admin'
import WasteG from './Pages/WasteGuide/WasteG'

function App() {
  

  return (
    <>
      <CivicALogin/>
      <Adminlogin/>
      <DustbinMap />
      <WasteG/>
    </>
  )
}

export default App
