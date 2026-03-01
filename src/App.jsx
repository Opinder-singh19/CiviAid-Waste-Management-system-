import { useState } from 'react'
import DustbinMap from "./Components/Map/DustbinMap";
import './App.css'
import CivicALogin from './Components/Pages/CivicAidLogin'
import  Adminlogin from './Components/Pages/Admin'

function App() {
  

  return (
    <>
      <CivicALogin/>
      <Adminlogin/>
      <DustbinMap />
    </>
  )
}

export default App
