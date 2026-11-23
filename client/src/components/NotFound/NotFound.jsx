import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <h2>Oops! Page Not Found</h2>
            <p>
                The page you are looking for might have been removed, 
                had its name changed, or is temporarily unavailable.
            </p>
           
            <Link to="/dashboard" className="back-home-btn">
                <i className="bi bi-arrow-left me-2"></i>
                Back to Dashboard
            </Link>
        </div>
    );
}