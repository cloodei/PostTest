import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, BrowserRouter } from 'react-router-dom'
import globalVar from './globalVar.js'
import { Analytics } from "@vercel/analytics/react"

globalVar.init();

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App/>
        <Analytics></Analytics>
    </BrowserRouter>
)
