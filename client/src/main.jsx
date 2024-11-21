import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route , RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/features/store.js'


//Auth
import Login from './pages/Auth/Login.jsx'
import Register from "./pages/Auth/Register.jsx"


const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<App />}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    
     </Route>)
)



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={router}/>

  </Provider>
    
)
