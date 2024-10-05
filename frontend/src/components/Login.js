import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email,
            password,
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const body = JSON.stringify(user);

            const res = await axios.post(
                'http://localhost:5000/api/users/login',
                body,
                config
            );

            toast.success(res.data.msg);
            setFormData({
                email: '',
                password: '',
            });

        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data.msg);
            } else {
                toast.error('Invalid email or password');
            }
        }
    };
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={onSubmit}>
                <h2>Login</h2>
                <div>
                    <input
                        type="email"
                        placeholder="Email ID"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <div className="signup-link">
                    <p>Don't have an account? <a href="/signup">Signup</a></p>
                </div>
            </form>
        </div>
    );
};
export default Login;
