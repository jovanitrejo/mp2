import './App.css'
import { Outlet } from 'react-router'
import Navbar from './shell/Navbar';
import Footer from './shell/Footer';

function App() {

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
