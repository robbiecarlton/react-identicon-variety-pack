import React, { useState } from 'react'
import './App.css'
import { Bishop, Blockie, Discs, Rings, Network, NetworkLarge } from './Identicon'
import { isEmpty } from 'lodash'

const defaultHashes = [
  "QmaDraiSDBesNvg7UMwrVyew4PVsWBvy6xMabqvbozyP5z",
  "QmYXml2PSuj3uxrcc5bVUYYYrppYigvMAyAQAd4GwW4ez9",
  "QmePKNAWyh4F5DDmfZV2efh7JBrGmSw1xzRndX9kskoFAM",
  "dsajdksaduihf",
  "HcSCiy9XxO7bkvspb63Jw3ekinYx9aJnhJpoj94jFKwxiHZFYEm5AXxott6bPI9"
]

const size = 128
const gridSize = 8

function App() {
  const [hashes, setHashes] = useState(defaultHashes)
  const [newHash, setNewHash] = useState('')
  const [circle, setCircle] = useState(true)  

  const addNewHash = () => {
    setHashes([newHash].concat(hashes))
    setNewHash('')
  }

  const removeHash = hash => () => {
    setHashes(hashes.filter(h => h !== hash))
  }

  const components = [
    { Component: Network, label: 'Network' },
    { Component: Bishop, label: 'Bishop' },
    { Component: Rings, label: 'Rings' },
    { Component: Blockie, label: 'Blockie' },
    { Component: NetworkLarge, label: 'Network Large' },
    { Component: Discs, label: 'Discs' }
  ]

  return <div className='app'>
    <div className='control-row'>
      <div className='control-box'>
        <div className='input-row'>
          <input
            className='input'
            value={newHash}
            onChange={({ target: { value }}) => setNewHash(value)} />
          <button onClick={addNewHash}>Add</button>
        </div>
        <div>
          <button onClick={() => setCircle(!circle)}>{circle ? 'Square' : 'Circle'}</button>
        </div>
      </div>
      {!isEmpty(newHash) && components.map(({ Component }, i) => 
        <Component className='identicon' size={size} gridSize={gridSize} seed={newHash} circle={circle} key={i} /> 
      )}
    </div>
    {components.map(({ Component, label }, i) => 
      <div key={i} className='identicon-row'>
        {hashes.map(hash =>
          <Component className='identicon'size={size} gridSize={gridSize} seed={hash} key={hash} circle={circle} />
        )}
        <div className='identicon-label'>{label}</div>
      </div>
    )}  
    <div>
      <h4>Hashes - Click to remove from list</h4>
      {hashes.map(hash =>
        <div key={hash} onClick={removeHash(hash)}>
          {hash}
        </div>
      )}
    </div>
  </div>
}

export default App;


