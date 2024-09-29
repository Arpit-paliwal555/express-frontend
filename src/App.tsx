import './App.css'
import Navbar from './components/navbar';
import { Route,Routes, BrowserRouter } from 'react-router-dom';
import Search from './pages/search';
import Transactions from './pages/transactions';
import Dashboard from './pages/dashboard';
import User from './pages/user';
import Returnbook from './pages/returnbook';
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/search" element={<Search/>}></Route>
      <Route path="/transactions" element={<Transactions/>}></Route>
      <Route path="/user" element={<User/>}></Route>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/returnBook" element={<Returnbook />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}




export default App
