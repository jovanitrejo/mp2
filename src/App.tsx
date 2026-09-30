import './App.css'
import { Outlet } from 'react-router'
import Navbar from './shell/Navbar';

function App() {

  return (
    <div>
      <Navbar />
      {/*App-Content*/}
      <main>
        <Outlet />
      </main>
      {/*Footer*/}
    </div>
  )
}

export default App
