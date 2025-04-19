import { useState, useEffect } from "react";

export default function AdminContactForm() {
    const [info, setInfo] = useState({
        phone: "",
        email: "",
        address: "",
        businessHours: "",
        socialLinks: {
            facebook: "",
            instagram: "",
            linkedin: "",
            twitter: "",
        },
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/contactinfo")
            .then((res) => res.json())
            .then((data) => {
                setInfo(data || {
                    phone: "",
                    email: "",
                    address: "",
                    businessHours: "",
                    socialLinks: {
                        facebook: "",
                        instagram: "",
                        linkedin: "",
                        twitter: "",
                    },
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in info.socialLinks) {
            setInfo((prev) => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [name]: value,
                },
            }));
        } else {
            setInfo((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/contactinfo", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Invalid response' }));
                setError(errorData.error || 'Something went wrong');
                setLoading(false);
                return;
            }
            setSuccess("Contact info updated!");
        } catch {
            setError("Failed to update contact info.");
        }
        setLoading(false);
    };

    return (
        <div className="container mx-auto px-4 pt-5 min-h-screen bg-gray-300">
            <h1 className="text-center text-2xl font-bold text-blue-600">Update Contact Information</h1>
            <hr className="my-4 border-gray-600" />

            <div className="flex flex-col items-center justify-center min-h-[60vh] pb-6">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl text-black">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h5 className="text-lg font-bold">Contact Info</h5>
                    </div>
                    <div className="p-4">
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Phone</label>
                                    <input
                                        name="phone"
                                        value={info.phone}
                                        onChange={handleChange}
                                        placeholder="Phone"
                                        className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input
                                        name="email"
                                        value={info.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Address</label>
                                    <input
                                        name="address"
                                        value={info.address}
                                        onChange={handleChange}
                                        placeholder="Address"
                                        className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Business Hours</label>
                                    <input
                                        name="businessHours"
                                        value={info.businessHours}
                                        onChange={handleChange}
                                        placeholder="Business Hours"
                                        className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Facebook Username</label>
                                    <input
                                        name="facebook"
                                        value={info.socialLinks.facebook}
                                        onChange={handleChange}
                                        placeholder="Facebook Username"
                                        className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Instagram Username</label>
                                    <input
                                        name="instagram"
                                        value={info.socialLinks.instagram}
                                        onChange={handleChange}
                                        placeholder="Instagram Username"
                                        className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">LinkedIn Username</label>
                                    <input
                                        name="linkedin"
                                        value={info.socialLinks.linkedin}
                                        onChange={handleChange}
                                        placeholder="LinkedIn Username"
                                        className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-1">Twitter Username</label>
                                    <input
                                        name="twitter"
                                        value={info.socialLinks.twitter}
                                        onChange={handleChange}
                                        placeholder="Twitter Username"
                                        className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                                    />
                                </div>
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    {loading ? 'Loading...' : 'Update'}
                                </button>
                            </form>
                        )}
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
            </div>
        </div>
    );
}
