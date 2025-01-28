import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Header from './components/Header';
import Services from './routes/Services';
import AboutUs from './routes/AboutUs';
import Reviews from './routes/Reviews';

const App = () => {
  return (
    <div className="container">
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/services' element={<Services/>}/>
                <Route path='/about' element={<AboutUs/>}/>
            </Routes>
            <Reviews/>
        </Router>
    </div>
  );
};

export default App;
