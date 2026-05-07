import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SellProduct from './pages/SellProduct';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavigationBar />
        <Container as="main" className="flex-grow-1">
          <Routes>
            {/* ── Public routes: accessible without login ── */}
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ── Protected routes: redirect to /login if not authenticated ── */}
            <Route path="/" element={
              <PrivateRoute><Home /></PrivateRoute>
            } />
            <Route path="/sell" element={
              <PrivateRoute><SellProduct /></PrivateRoute>
            } />
            <Route path="/product/:id" element={
              <PrivateRoute><ProductDetail /></PrivateRoute>
            } />
            <Route path="/contact" element={
              <PrivateRoute><Contact /></PrivateRoute>
            } />
          </Routes>
        </Container>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
