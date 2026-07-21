import { useState,useEffect } from "react";
import login from '../api/authApi';
import {useNavigate,useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayout from "../components/AuthLayout";

function Login()
{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [successMessage] = useState(
        location.state?.success || ""
    );
    useEffect(() => {
        if (location.state?.success) {
            navigate(location.pathname, {
                replace: true,
                state: null
            });
        }
    }, [location.pathname, location.state, navigate]);
    const handleLogin= async(e)=>{
        e.preventDefault();

        setError("");
        setLoading(true);

        try
        {
            const { token, user } = await login(email, password);
            localStorage.setItem("token",token);
            localStorage.setItem("user",JSON.stringify(user));
            navigate("/venues");
        }
        catch(error)
        {
            setError(
                error.response?.data?.message || "Login failed. Please try again."
            );
        }
        finally 
        {
            setLoading(false);
        }
        
    };
    return (
            <AuthLayout buttonText="Sign Up" onButtonClick={() => navigate("/register")}>
                {/* Right Panel */}

                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-10 hover:shadow-3xl transition-all duration-300">

                        <h2 className="text-4xl font-bold text-center mb-3">
                            Login
                        </h2>

                        <p className="text-center text-gray-500 mb-10">
                            Welcome back! Please login to continue.
                        </p>
                        <form onSubmit={handleLogin}>
                            {/* Email */}
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

                            {/* Password */}

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
                                        autoComplete="current-password"
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

                                        {
                                            showPassword
                                                ? <FaEyeSlash />
                                                : <FaEye />
                                        }

                                    </button>

                                </div>

                            </div>

                            {/* Success */}

                            {
                                successMessage  && (
                                    <div className="mb-5 rounded-lg bg-green-100 p-3 text-green-700">
                                        {successMessage}
                                    </div>
                                )
                            }

                            {/* Error */}

                            {
                                error && (

                                    <div className="mb-4 bg-red-50 border border-red-300 text-red-700 rounded-lg p-3 text-sm">
                                        {error}
                                    </div>

                                )
                            }

                            {/* Login Button */}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 rounded-lg text-white font-semibold transition
                                ${
                                    loading
                                        ? "bg-blue-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                }`}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>
                        
                        {/* Register */}

                        <p className="text-center mt-8 text-gray-600">

                            Don't have an account?

                            <span
                                onClick={() => navigate("/register")}
                                className="text-blue-600 font-semibold cursor-pointer ml-2 hover:underline"
                            >
                                Sign Up
                            </span>

                        </p>

                    </div>
            </AuthLayout>
            
    );
}

export default Login;
