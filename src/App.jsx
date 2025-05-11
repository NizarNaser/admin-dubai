import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import AddCat from './pages/AddCat/AddCat';
import ListCat from './pages/ListCat/ListCat';
import UpdateFood from './pages/UpdateFood/UpdateFood';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import UpdateCat from './pages/UpdateCat/UpdateCat';
import Home from './pages/Home/Home.jsx';
import LoginPopup from "./pages/loginPopup/LoginPopup";
import { useState, useEffect } from 'react';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {

    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const ProtectedRoute = ({ children, token }) => {
    return token ? children : <Navigate to="/login" />;
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
   
  };

  return (
    <div>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} setToken={handleLoginSuccess} />}
      <Navbar setShowLogin={setShowLogin} token={token} setToken={setToken} />
      <hr />
      <div className="app-content">
        <Sidebar />
       
       
        <Routes> 
              <Route path="/admin-dubai" element={<Home />} />
             
              <Route path="/admin-dubai/add" element={<ProtectedRoute token={token}><Add /></ProtectedRoute>} />
              <Route path="/admin-dubai/list" element={<ProtectedRoute token={token}><List /></ProtectedRoute>} />
              <Route path="/admin-dubai/orders" element={<ProtectedRoute token={token}><Orders  /></ProtectedRoute>} />
              <Route path="/admin-dubai/add-cat" element={<ProtectedRoute token={token}><AddCat  /></ProtectedRoute>} />
              <Route path="/admin-dubai/list-cat" element={<ProtectedRoute token={token}><ListCat  /></ProtectedRoute>} />
              <Route path="/update-food/:id" element={<ProtectedRoute token={token}><UpdateFood  /></ProtectedRoute>} />
              <Route path="/update-cat/:id" element={<ProtectedRoute token={token}><UpdateCat  /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
