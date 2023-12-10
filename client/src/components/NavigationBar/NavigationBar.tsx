import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    BrowserRouter
} from 'react-router-dom'

const NavigationBar = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/Login"}>Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavigationBar;