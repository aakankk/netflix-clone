import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import { Routes, Route , useLocation, useNavigate} from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideNavbar = location.pathname.startsWith('/player') || location.pathname === '/login';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("logged Out → navigating to /login");
        navigate('/login');
      } else {
        console.log("logged In");
        // only redirect if they are on login page
        if (location.pathname === '/login') {
          navigate('/');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
