import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../context/auth-context';

import './MainNavigation.css';

export const MainNavigation = () => {
    const { auth, logOut } = useAuth();

    console.log(auth);

    return (
        <header className="main-navigation">
            <div className="main-navigation__logo">
                <h1>Navbar</h1>
            </div>
            <nav className="main-navigation__items">
                <ul>
                    {!auth && (
                        <li>
                            <NavLink to="/auth">Login</NavLink>
                        </li>
                    )}
                    {auth && (
                        <>
                            <li>
                                <NavLink to="/events">Events</NavLink>
                            </li>
                            <li>
                                <NavLink to="/bookings">Bookings</NavLink>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    title="Sign Out"
                                    onClick={logOut}
                                >
                                    LogOut
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};
