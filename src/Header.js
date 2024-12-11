import { faSignOut, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArgentBankLogo from "./images/argentBankLogo.png";
import "./main.css";
import { disconnectUser } from "./store/userSlice";

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    console.log("user STORE REDUX =>", user);
    return (
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src={ArgentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {user ? (
                    <div>
                        <Link to="/user" className="main-nav-item">
                            <FontAwesomeIcon icon={faUserCircle} />{" "}
                            {user.userName}
                        </Link>
                        <Link
                            to="/"
                            className="main-nav-item"
                            onClick={() => {
                                dispatch(disconnectUser());
                                localStorage.removeItem("token");
                            }}
                        >
                            <FontAwesomeIcon icon={faSignOut} /> Sign Out
                        </Link>
                    </div>
                ) : (
                    <Link to="/sign-in" className="main-nav-item">
                        <FontAwesomeIcon icon={faUserCircle} /> Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
};
export default Header;
