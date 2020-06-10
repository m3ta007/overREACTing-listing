import React from 'react'
import './App.css'
import Listing from './components/Listing'
import data from './data/etsy.json'

function App() {
  const items = data

  return (
    <>
      <Listing items={items} />
    </>
  )
}

export default App
