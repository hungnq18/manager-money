import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/intro.css';

function Intro() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); // Navigate to the waiting page after the intro
    }, 5000); // Display the intro page for 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="intro-container">
      <div className="intro-content">
        <h1 className="intro-title">Welcome to ManagerMoney</h1>
        <p className="intro-subtitle">Making finance management easy and accessible.</p>
      </div>
    </div>
  );
}

export default Intro;
