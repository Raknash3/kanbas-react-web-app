import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill, BsTrash3Fill, BsPlusCircleFill, BsPencil } from "react-icons/bs";
import * as client from "./client";

function UserTable() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({ username: "", password: "", role: "USER" });

    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const selectUser = async (user) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };

    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mt-5">
            <h1>User List</h1>
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>

                            <input
                                type="text"
                                className="form-control "
                                placeholder="Username"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                            />

                            <input
                                type="text"
                                className="form-control mt-2"
                                placeholder="Password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                            
                        </th>
                        <th>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                value={user.firstName}
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                            />
                        </th>
                        <th>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            />
                        </th>
                        <th>
                            <select
                                className="form-select"
                                value={user.role}
                                onChange={(e) => setUser({ ...user, role: e.target.value })}
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </select>
                        </th>
                        <th>
                            <button
                                type="button"
                                className="btn btn-success me-2"
                                onClick={updateUser}
                            >
                                <BsFillCheckCircleFill className="fs-5" />
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={createUser}
                            >
                                <BsPlusCircleFill className="fs-5" />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>
                                <Link to={`/project/account/${user._id}`}>
                                    {user.username}
                                </Link>
                            </td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.role}</td>
                            
                            <td className="text-nowrap">
                                <button className="btn btn-warning me-2" onClick={() => selectUser(user)}>
                                    <BsPencil />
                                </button>
                                <button className="btn btn-danger me-2" onClick={() => deleteUser(user)}>
                                    <BsTrash3Fill />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
