import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/home/Home.js";
import Footer from "./Footer";
import Header from "./Header";
import "./main.css";
import SignIn from "./pages/signIn/SignIn.js";
import User from "./pages/user/User.js";
import { fetchToConnectUser } from "./store/userSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // je vérifie si j'ai un token dans le localStorage, si oui je le récupère et je fais un appel à l'api pour récupérer les infos de l'utilisateur
        const hasToken = localStorage.getItem("token");
        if (hasToken && hasToken.length > 0) {
            dispatch(fetchToConnectUser(hasToken, true));
        }
    }, [dispatch]);
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/user" element={<User />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
