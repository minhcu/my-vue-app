import { DefaultLayout } from './layouts/default'
import { BlankLayout } from './layouts/blank'
import { Outlet } from 'react-router'

function App() {
  return (
    <>
      {window.location.pathname === '/login' ? (<BlankLayout><Outlet /></BlankLayout>) : (<DefaultLayout><Outlet /></DefaultLayout>)}
    </>
  )
}

export default App
