import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Router, useNavigate } from "react-router-dom";

function Authform() {
    const location = useLocation();
    const propValue = new URLSearchParams(location.search).get('authType');
    const navigate = useNavigate();

    let [authMode, setAuthMode] = useState(propValue)
    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin");
    }

    const [formData, setFormData] = useState({
        // Initialize the form data fields
        name: '',
        email: '',
        password: '',
    });

     // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(authMode);

        const {email, password} = formData;

        // Access the form data from the state variable (formData)
        const data = JSON.stringify({
            eml: email,
            password: password
        });
        const jsonData = JSON.stringify(data);

        const params = new URLSearchParams();
        params.append("kwd", "open");
        params.append("eml", email);
        params.append("pwd", password);

        
        // const queryString = params.toString();
        console.log(params);

        // Send it to an API
       const apiUrl = process.env.REACT_APP_ENDPOINT_URL;

        try {
            const response = await fetch(`${apiUrl}?${params}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            if (response.ok) {
                // Request successful, handle the response
                const responseData = await response.json(); // Decode the JSON response
                console.log(responseData);
                
                // Reset the form data
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                })
                if (responseData.status == 100) {
                    console.log("Dashboard loading");
                    navigate("/components/Dashboard");

                } else {
                    
                }
            } else {
                // Request failed, handle the error
                console.error('Error sending data');
            }
        } catch (error) {
        console.error('Error sending data', error);
        }
    }

     // Function to handle input changes and update the form data state
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    };

    if (authMode === "signin") {
        return(
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                        <h2 className="Auth-form-title">Sign In</h2>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign Up
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                            type="email"
                            name="email"
                            className="form-control mt-1"
                            value={formData.email}
                           onChange={handleInputChange}
                            placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                            type="password"
                            name="password"
                            className="form-control mt-1"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            />
                        </div>
                        <input value={formData.authVal} name="authval" onChange={handleInputChange} hidden/>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p className="forgot-password text-right mt-2">
                        <a href="/components/ResetPassword">Forgot password?</a> 
                        </p>
                    </div>
                </form>
            </div>
        )
    }
    
    return(
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h2 className="Auth-form-title">Sign Up </h2>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                        type="text"
                        value={formData.name}
                        name="name"
                        onChange={handleInputChange}
                        className="form-control mt-1"
                        placeholder="e.g Jane Doe"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                        type="email"
                        className="form-control mt-1"
                        value={formData.email}
                        name="email"
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                        type="password"
                        name="password"
                        className="form-control mt-1"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                        />
                    </div>
                    <input value={formData.authVal} name="authval" onChange={handleInputChange} hidden/>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                    <a href="/components/ResetPassword">Forgot password?</a> 
                    </p>
                </div>
            </form>
        </div>
    )
}