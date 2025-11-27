// src/components/Hero.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
    const [typedText, setTypedText] = useState('');
    const navigate = useNavigate();
    const textToType = "Empowering Women Entrepreneurs";

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= textToType.length) {
                setTypedText(textToType.substring(0, currentIndex));
                currentIndex++;
            } else {
                // Optional: Reset and restart the animation
                currentIndex = 0;
            }
        }, 150); // Adjust typing speed here

        return () => clearInterval(typingInterval); // Cleanup on component unmount
    }, []);

    const handleExploreClick = () => {
        navigate('/explore');
    };

    const handleJoinClick = () => {
        navigate('/join');
    };

    return (
        <section id="home" className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            <span className="typing-container">
                                <span className="typing-text">{typedText}</span>
                                <span className="typing-cursor">|</span>
                            </span>
                        </h1>
                        <h2 className="hero-subtitle">Empowering Women Entrepreneurs in Kenya</h2>
                        <p className="hero-description">
                            Queen of Her Yard provides a platform for women to showcase their businesses, connect with
                            customers, and grow their enterprises through digital tools and community support. [1, 2]
                        </p>
                        <div className="hero-buttons">
                            <button className="btn btn-primary" onClick={handleExploreClick}>
                                <i className="fas fa-search"></i>
                                Explore Businesses
                            </button>
                            <button className="btn btn-secondary" onClick={handleJoinClick}>
                                <i className="fas fa-users"></i>
                                Join Our Community
                            </button>
                        </div>
                    </div>
                    <div className="hero-image">
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
