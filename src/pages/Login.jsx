import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // FORM STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // LOGIN FUNCTION
  const handleLogin = async (e) => {

    e.preventDefault();

    setIsLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password
          }),
        }
      );

      // GET USER DATA
      const data = await response.json();

      setIsLoading(false);

      // LOGIN SUCCESS
      if (data) {

        // SAVE FULL USER DATA
        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        alert("Login Successful 😎🔥");

        navigate("/");

      } else {

        alert("Invalid Email or Password ❌");

      }

    } catch (error) {

      console.error(error);

      setIsLoading(false);

      alert("Something went wrong ❌");

    }
  };

  return (

    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-slate-900">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop")'
        }}
      ></div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900"></div>

      {/* GLOW EFFECTS */}
      <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none animate-pulse"></div>

      <div
        className="absolute bottom-[20%] right-[20%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6 py-12"
      >

        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">

          {/* HOVER GLOW */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          {/* HEADER */}
          <div className="text-center mb-8 relative z-10">

            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
              Welcome Back
            </h1>

            <p className="text-slate-400 text-sm">
              Enter your credentials to access your account
            </p>

          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">

            <div className="space-y-4">

              {/* EMAIL */}
              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">

                  <Mail size={18} />

                </div>

                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 text-slate-200 text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />

              </div>

              {/* PASSWORD */}
              <div className="relative">

                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">

                  <Lock size={18} />

                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 text-slate-200 text-sm rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                >

                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}

                </button>

              </div>

            </div>

            {/* REMEMBER ME */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center space-x-2 cursor-pointer">

                <input type="checkbox" />

                <span className="text-slate-400">
                  Remember me
                </span>

              </label>

              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors hover:underline"
              >
                Forgot password?
              </a>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-glow rounded-xl py-3.5 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >

              {isLoading ? (

                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>

              ) : (

                <>
                  Sign In

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>

              )}

            </button>

          </form>

          {/* REGISTER LINK */}
          <div className="mt-8 text-center text-sm text-slate-400 relative z-10">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors hover:underline"
            >
              Create one now
            </Link>

          </div>

        </div>

        {/* BACK HOME */}
        <div className="mt-6 text-center">

          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2"
          >

            <ArrowRight
              size={14}
              className="rotate-180"
            />

            Back to Home

          </Link>

        </div>

      </motion.div>

    </div>

  );
};

export default Login;