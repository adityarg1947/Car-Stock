import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // REGISTER FUNCTION
  const handleRegister = async (e) => {

    e.preventDefault();

    // PASSWORD MATCH CHECK
    if (password !== confirmPassword) {

      alert("Passwords do not match ❌");
      return;

    }

    setIsLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      setIsLoading(false);

      alert("Registration Successful 😎🔥");

      // REDIRECT TO LOGIN
      navigate("/login");

    } catch (error) {

      console.error(error);

      setIsLoading(false);

      alert("Something went wrong ❌");

    }
  };

  return (

    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-slate-900 py-10">

      {/* Fullscreen luxury background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop")'
        }}
      ></div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-slate-900"></div>

      {/* Glow Effects */}
      <div className="absolute top-[30%] right-[10%] w-[40vw] h-[40vw] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none animate-pulse"></div>

      <div
        className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >

        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">

          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          {/* HEADER */}
          <div className="text-center mb-8 relative z-10">

            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
              Create Account
            </h1>

            <p className="text-slate-400 text-sm">
              Join our premium car rental platform
            </p>

          </div>

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-5 relative z-10">

            {/* FULL NAME */}
            <div className="relative group/input">

              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">

                <User size={18} />

              </div>

              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 text-slate-200 text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />

            </div>

            {/* EMAIL */}
            <div className="relative group/input">

              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">

                <Mail size={18} />

              </div>

              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 text-slate-200 text-sm rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />

            </div>

            {/* PASSWORD */}
            <div className="relative group/input">

              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">

                <Lock size={18} />

              </div>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 text-slate-200 text-sm rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
              >

                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}

              </button>

            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative group/input">

              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">

                <Lock size={18} />

              </div>

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 text-slate-200 text-sm rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
              >

                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}

              </button>

            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-glow rounded-xl py-3.5 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >

              {isLoading ? (

                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>

              ) : (

                <>
                  Create Account

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>

              )}

            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="mt-8 text-center text-sm text-slate-400 relative z-10">

            Already have an account?{' '}

            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
            >
              Sign In
            </Link>

          </div>

        </div>

        {/* BACK TO HOME */}
        <div className="mt-6 text-center">

          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2"
          >

            <ArrowRight size={14} className="rotate-180" />

            Back to Home

          </Link>

        </div>

      </motion.div>

    </div>

  );
};

export default Register;