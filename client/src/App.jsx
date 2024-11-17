import {Outlet} from 'react-router-dom'
import Navbar from './pages/Auth/Navbar'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import './App.css'

function App() {


  return (
    <>
      <ToastContainer />
      <Navbar />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  )
}

export default App
