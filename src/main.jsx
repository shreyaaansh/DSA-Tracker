import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import chakraTheme from './chakraTheme.js'
import DiffChecker from './components/common/DiffChecker.js'
import ultimateData from './components/common/ultimateData.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let fetchData = localStorage.getItem('A2Z_Archive')
fetchData = fetchData === null ? ultimateData : JSON.parse(fetchData)
fetchData = DiffChecker(ultimateData, fetchData)
import { AuthProvider } from './hooks/useAuth';
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider theme={chakraTheme}>
            <BrowserRouter>
                <AuthProvider>
                <App fetchData={fetchData} />
                <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
                </AuthProvider>
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>
)
