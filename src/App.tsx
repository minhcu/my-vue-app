import { DefaultLayout } from './layouts/default'
import { Outlet } from 'react-router'
function App() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default App
