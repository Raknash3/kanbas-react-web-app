import React from "react";
import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const signin = async () => {
        await client.signin(credentials);
        navigate("/project/account");
    };

    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-3">
                <h1 className="text-center mb-4">Signin</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={signin}>Signin</button>
                </form>
            </div>
        </div>
    );
}

export default Signin;
