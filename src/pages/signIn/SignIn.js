import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchToConnectUser, selectUser } from "../../store/userSlice";
import SignInInput from "./SignInInput";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // je récupère les infos de l'utilisateur dans le store
    const userStore = useSelector(selectUser);
    // si l'utilisateur est déjà connecté je le redirige vers la page user
    if (userStore) {
        return <Navigate to="/user" />;
    }

    // les deux fonctions pour gérer les inputs , se mettent à jour à chaque fois que l'utilisateur tape quelque chose
    const handleOnChangeUser = (e) => {
        setUser(e.target.value);
    };
    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };
    console.log("rememberMe =>", rememberMe);
    // appel de l'api pour vérifier les infos de l'utilisateur
    const checkUser = async () => {
        // j'appel l'api user login pour vérifier le mail et le mot de passe, si c'est bon je récupère le token, sinon je renvoie un message d'erreur, cett api doit être appelée en POST donc je le spécifie dans le headers de la requête
        const response = await fetch(
            "http://localhost:3001/api/v1/user/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user,
                    password: password,
                }),
            }
        );
        // je récupère la réponse de l'api
        const data = await response.json();
        console.log("data =>", data);
        // si la réponse à un status 200 et qu'il y a un token alors je peux aller récupérer les infos de l'utilisateur
        if (data?.status === 200 && data?.body?.token?.length > 0) {
            // j'appel l'api user profile pour récupérer les infos de l'utilisateur, une fois connecté je redirige l'utilisateur vers la page user
            dispatch(fetchToConnectUser(data?.body?.token, rememberMe)).then(
                () => {
                    navigate("/user");
                }
            );
        } else {
            setErrorMessage("Incorrect user or password");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage("");
        if (user?.length === 0 || password?.length === 0) {
            return;
        }
        checkUser();
    };
    return (
        <div className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faUserCircle} />
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <SignInInput
                        id="username"
                        label="Username"
                        value={user}
                        onChange={handleOnChangeUser}
                    />
                    <SignInInput
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handleOnChangePassword}
                    />
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            onChange={(e) => {
                                setRememberMe(e.target.checked);
                            }}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                    )}

                    <button
                        type="submit"
                        className="sign-in-button"
                        disabled={user?.length === 0 || password?.length === 0}
                    >
                        Sign In
                    </button>
                </form>
            </section>
        </div>
    );
};
export default SignIn;
