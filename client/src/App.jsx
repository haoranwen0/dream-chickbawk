import * as React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Main } from './components'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Main />}>
      <Route path='referral' element={<Main />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
