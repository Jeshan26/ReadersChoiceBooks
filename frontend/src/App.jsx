import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
const App = () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route ></Route>
        </Routes>
        <Footer/>
      </Router>
      <Home/>
    </div>
  );
}
export default App;