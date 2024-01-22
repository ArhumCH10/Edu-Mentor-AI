import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { AuthProvider } from "./AuthContext.jsx";
import {UserProvider} from './UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
    <App />
    </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
)
