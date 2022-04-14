import React from 'react'
import ReactDOM from 'react-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App'
import { PersistGate } from 'zustand-persist'

ReactDOM.render(
  <React.StrictMode>
    <PersistGate>
      <div className="w-full max-w-2xl p-4 mx-auto md:px-0 md:py-10">
        <Toaster position="top-right" />
        <App />
      </div>
    </PersistGate>
  </React.StrictMode>,
  document.getElementById('root')
)
