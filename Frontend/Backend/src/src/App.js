// src/App.js
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import './App.css'; // You might need to create this file and move your existing styles

function App() {
    return (
        <div className="App">
            <Header />
            <Hero />
            {/* Add other sections similarly */}
        </div>
    );
}

export default App;
