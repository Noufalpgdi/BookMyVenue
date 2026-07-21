import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useState } from "react";
import { register } from "../services/authService";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";


function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try
        {
            setLoading(true);
            await register(name, email, password);
            navigate("/login", {
                state: {
                    success: "Registration successful! Please log in."
                }
            });
        }
        catch(error)
        {
            setError(
                error.response?.data?.message ||
                "Registration failed."
            );
        }
        finally
        {
            setLoading(false);
        }
        
    };
    return (
        <AuthLayout buttonText="Login" onButtonClick={() => navigate("/login")}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-10 hover:shadow-3xl transition-all duration-300">

                <h2 className="text-4xl font-bold text-center mb-3">
                    Register
                </h2>

                <p className="text-center text-gray-500 mb-10">
                    Create your account to get started.
                </p>

                <form onSubmit={handleRegister}>
                    <div className="mb-5">

                        <label className="block mb-2 font-medium">
                            Full Name
                        </label>

                        <div className="relative">

                            <FaUser
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            />

                            <input
                                type="text"
                                required
                                autoComplete="name"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />

                        </div>

                    </div>
                    <div className="mb-5">

                        <label className="block mb-2 font-medium">
                            Email Address
                        </label>

                        <div className="relative">

                            <FaEnvelope
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            />

                            <input
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />

                        </div>

                    </div>
                    <div className="mb-5">

                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <div className="relative">

                            <FaLock
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                autoComplete="new-password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border rounded-lg pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>

                    </div>
                    <div className="mb-5">

                        <label className="block mb-2 font-medium">
                            Confirm Password
                        </label>

                        <div className="relative">

                            <FaLock
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                            />

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                autoComplete="new-password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border rounded-lg pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>

                    </div>

                    {
                        error && (
                            <div className="mb-5 rounded-lg bg-red-100 p-3 text-red-700">
                                {error}
                            </div>
                        )
                    }

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

            </div>
        </AuthLayout>
    );
}


export default Register;