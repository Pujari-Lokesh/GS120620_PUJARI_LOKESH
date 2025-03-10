import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Stores from './pages/Stores';
import SKUs from './pages/SKUs';
import Planning from './pages/Planning';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flexGrow: 1, padding: '20px' }}>
                    <Routes>
                        <Route path="/stores" element={<Stores />} />
                        <Route path="/skus" element={<SKUs />} />
                        <Route path="/planning" element={<Planning />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
