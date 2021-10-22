import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../context/auth-context';

import './MainNavigation.css';

export const MainNavigation = () => {
    const [auth] = useAuth();

    return (
        <header className="main-navigation">
            <div className="main-navigation__logo">
                <h1>Navbar</h1>
            </div>
            <nav className="main-navigation__items">
                <ul>
                    {!auth.token && (
                        <li>
                            <NavLink to="/auth">Login</NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to="/events">Events</NavLink>
                    </li>
                    {auth.token && (
                        <li>
                            <NavLink to="/bookings">Bookings</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};
