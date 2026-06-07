import { Search, Bell, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profileImage: ''
  });

  useEffect(() => {

    const fetchUser = () => {

      const userStr = localStorage.getItem("user");

      if (userStr) {

        setUserData(JSON.parse(userStr));

      }

    };

    fetchUser();

    window.addEventListener('userUpdated', fetchUser);

    return () =>
      window.removeEventListener('userUpdated', fetchUser);

  }, []);

  const defaultAvatar =
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4";

  return (

    <nav className="w-full h-20 glass-panel border-x-0 border-t-0 flex items-center justify-between px-6 lg:px-10 z-30 relative">

      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center flex-1 max-w-md ml-4 lg:ml-0 relative group">

        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:group-focus-within:text-blue-400 group-focus-within:text-blue-600 transition-colors">

          <Search size={18} />

        </div>

        <input
          type="text"
          placeholder="Search for cars, bookings..."
          className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-slate-200 text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 ml-auto">

        {/* MOBILE SEARCH */}
        <button className="md:hidden p-2 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors">

          <Search size={20} />

        </button>

        {/* THEME TOGGLE */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-500 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-blue-500/10 rounded-full transition-colors relative"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* NOTIFICATIONS */}
        <button className="p-2 text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors relative">

          <Bell size={20} />

          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>

        </button>

        {/* USER PROFILE */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-300 dark:border-white/10 ml-2 hover:scale-105 transition-all duration-300 group cursor-pointer"
        >

          {/* AVATAR */}
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-purple-500/50 p-[2px] group-hover:border-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300">

            <img
              src={userData.profileImage || defaultAvatar}
              alt="User profile"
              className="w-full h-full object-cover rounded-full bg-slate-200 dark:bg-slate-800"
            />

          </div>

          {/* USER INFO */}
          <div className="hidden sm:block text-left">

            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-white transition-colors duration-300">

              {userData.name || 'User'}

            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors duration-300">

              Premium Member

            </p>

          </div>

        </button>

      </div>

    </nav>

  );
};

export default Navbar;