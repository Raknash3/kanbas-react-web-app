import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import * as client from "./client";

function Account() {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();

    const fetchAccount = async () => {
        const fetchedAccount = await client.account();
        setAccount(fetchedAccount);
    };

    const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
    };

    const save = async () => {
        console.log(account)
        await client.updateUser(account);
    };

    const signout = async () => {
        await client.signout();
        navigate("/project/signin");
    };



    useEffect(() => {
        if (id) {
            findUserById(id);
        } else {
            fetchAccount();
        }
    }, []);


    return (
        <div className="container mt-5">
            <div className="col-md-6 offset-md-3">
                <h1 className="text-center mb-4">Account</h1>
                {account && (
                    <form>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={account.password}
                                onChange={(e) => setAccount({ ...account, password: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                value={account.firstName}
                                onChange={(e) => setAccount({ ...account, firstName: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                value={account.lastName}
                                onChange={(e) => setAccount({ ...account, lastName: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dob"
                                value={account.dob ? account.dob.substring(0, 10) : ""}
                                onChange={(e) => setAccount({ ...account, dob: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={account.email}
                                onChange={(e) => setAccount({ ...account, email: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Role</label>
                            <select
                                className="form-select"
                                id="role"
                                onChange={(e) => setAccount({ ...account, role: e.target.value })}
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </select>
                        </div>
                    </form>
                )}

                <button className="btn btn-primary w-50 mb-3" onClick={save}>
                    Save
                </button>

                <button className="btn btn-danger w-50 mb-3" onClick={signout}>
                    Sign out
                </button>

                <Link to="/project/admin/users" className="btn btn-warning w-100">
                    Users
                </Link>

                
                
            </div>
            
        </div>
    );
}

export default Account;
