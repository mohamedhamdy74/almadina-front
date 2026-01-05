import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from "./pages/Home"
import Footer from './components/Footer'
import Laptops from "./pages/Laptops"
import Accessories from "./pages/Accessories"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import ProductDetails from "./pages/ProductDetails";
import ProtectedRoute from './components/ProtectedRoute';
import AIAssistant from "./pages/AIAssistant";
import About from "./pages/About";


function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/admin' && <Navbar />}

      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/laptops' element={
          <ProtectedRoute>
            <Laptops />
          </ProtectedRoute>
        } />
        <Route path='/laptops/:id' element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        } />
        <Route path='/accessories' element={
          <ProtectedRoute>
            <Accessories />
          </ProtectedRoute>
        } />
        <Route path='/accessories/:id' element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        } />
        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={
          <ProtectedRoute adminOnly={true}>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path='/ai-assistant' element={
          <ProtectedRoute>
            <AIAssistant />
          </ProtectedRoute>
        } />
        <Route path='/about' element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        } />
      </Routes>

      {location.pathname !== '/login' && location.pathname !== '/admin' && <Footer />}
    </>
  )
}

export default App
