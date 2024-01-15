import React from "react";
import {Link, useNavigate} from "react-router-dom";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "#FFFFFF"}
    }else{
        return {color: "#D1D1D1"}

    }
}

const Menu = ({history}) => {
    const navigate = useNavigate();
    return(
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">
                        Cart
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">
                        DashBoard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">
                        A.DashBoard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">
                        Signup
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">
                        Sign in
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">
                        Signout
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Menu;