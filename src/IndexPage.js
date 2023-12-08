import React from "react";
import { Router, useNavigate } from "react-router-dom";
import "./App.css";
import backgroundImage from "./images/background_img.gif";


const IndexPage = () => {
    const navigate = useNavigate();

    const handleAuth = (authType) => {
        navigate(`/components/AuthForm?authType=${authType}`);
    }

    return (
        <div className="index-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div>

                    <h1 className="text-white">What do you want to do?</h1>
                    <div className="row" >
                        <div className="col-6">
                            <button className="signin" onClick={() => handleAuth("signup")}>Sign up</button>
                        </div>
                        <div className="col-6">
                            <button className="signin" onClick={() => handleAuth("signin")}>Login</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default IndexPage;