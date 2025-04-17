import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: ''
    });

    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null); // New state for success message
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null); // Clear success message on new submission

        const res = await fetch('http://localhost:5000/admin/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!res.ok) {
            console.error(`Error: ${res.status} - ${res.statusText}`);
            const errorData = await res.json().catch(() => ({ error: 'Invalid response' }));
            setError(errorData.error || 'Something went wrong');
            setLoading(false);
            return;
        }

        const data = await res.json();
        if (data.success === false) {
            setError(data.message);
            setLoading(false);
            return;
        }

        setLoading(false);
        setError(null);
        setSuccess('Registration successful!'); // Set success message
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Register Admin</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            id="username"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="uppercase w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </form>
                {error && (
                    <div className="mt-4 text-red-500 text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mt-4 text-green-500 text-sm">
                        {success}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup;
