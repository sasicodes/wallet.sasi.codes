import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="w-full max-w-2xl p-4 mx-auto md:px-0 md:py-10">
      <Toaster position="bottom-center" />
      <App />
    </div>
  </React.StrictMode>
)
