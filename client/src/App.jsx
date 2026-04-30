import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Header from './components/Header';
import Services from './routes/Services';
import AboutUs from './routes/AboutUs';
import GiveawayEntries from './routes/GiveawayEntries';
import EmergencyRepair from './routes/EmergencyRepair';
import FansLighting from './routes/FansLighting';
import Level2Charger from './routes/Level2Charger';
import PanelUpgrades from './routes/PanelUpgrades';
import RewireOutlets from './routes/RewireOutlets';
import Callus from './components/Callus';
import ScrollToTop from './utils/ScrollToTop';

const App = () => {
  return (
    <div className="container">
        <Router>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/services' element={<Services/>}/>
                <Route path='/about' element={<AboutUs/>}/>
                <Route path='/submissions' element={<GiveawayEntries/>}/>
                <Route path='/emergency-repair' element={<EmergencyRepair/>}/>
                <Route path='/fans-lighting' element={<FansLighting/>}/>
                <Route path='/level-2-charger' element={<Level2Charger/>}/>
                <Route path='/panel-upgrades' element={<PanelUpgrades/>}/>
                <Route path='/rewire-outlets' element={<RewireOutlets/>}/>
            </Routes>
        </Router>
        <Callus/>
    </div>
  );
};

export default App;
