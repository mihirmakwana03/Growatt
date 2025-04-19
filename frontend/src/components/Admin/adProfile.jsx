// import { set } from 'mongoose';
import React from 'react';
import { useSelector } from 'react-redux';
import { updateUserStart, updateUserFailure, updateUserSuccess } from '../../redux/admin/adminSlice';
import { useDispatch } from 'react-redux';

const AdProfile = () => {
    const { currentUser, loading, error } = useSelector(state => state.user);

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    const dispatch = useDispatch();

    const [formData, setFormData] = React.useState({
        username: currentUser.username,
        email: currentUser.email,
        password: ''
    });
    console.log(formData);

    const handleChange = (e) => {
        setFormData({...formData,[e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(updateUserStart());
            const res = await fetch(`http://localhost:5000/admin/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // <--- This is required!
                body: JSON.stringify(formData)
            });
            

            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));

        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Admin Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center justify-center">
                    <div className="flex justify-center">
                        <img
                            src="../assets/user.png"
                            alt="profile"
                            className="w-24 h-24 rounded-full object-cover cursor-pointer"
                        />
                    </div>
                    <input
                        id="username"
                        type="text"
                        placeholder="username"
                        defaultValue={currentUser.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                    />
                    <input
                        id="email"
                        type="email"
                        placeholder="email"
                        defaultValue={currentUser.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                    />
                    <input
                        id="password"
                        type="password"
                        placeholder="password"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-black"
                    />
                    <button disabled={loading} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 uppercase">
                        {loading ? 'Loading...' : 'Update'}
                    </button>
                </form>
                <div className="flex justify-between mt-6">
                    <span className="text-red-500 cursor-pointer">Delete Account</span>
                    <span 
                        className="text-red-500 cursor-pointer" 
                        onClick={() => window.location.href = "/logout"}
                    >
                        Sign Out
                    </span>
                </div>
                <div className="mt-4 text-center text-gray-600 text-sm">
                    <p>Joined on: {new Date(currentUser.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-red-500 text-center mt-4">
                    {error ? error : ''}
                </div>
            </div>
        </div>
    );
};

export default AdProfile;
