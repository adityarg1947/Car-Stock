import { useState, useEffect } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  Compass,
  Heart,
  Calendar,
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
  Car
} from 'lucide-react';

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    profileImage: ''
  });

  const navigate = useNavigate();

  // LOAD USER
  useEffect(() => {

    const fetchUser = () => {

      const userStr =
        localStorage.getItem("user");

      if (userStr) {

        setUserData(
          JSON.parse(userStr)
        );

      }

    };

    fetchUser();

    window.addEventListener(
      'userUpdated',
      fetchUser
    );

    return () =>
      window.removeEventListener(
        'userUpdated',
        fetchUser
      );

  }, []);

  // LOGOUT
  const handleLogout = () => {

    // ONLY LOGOUT AUTH
    localStorage.setItem(
      "isAuthenticated",
      "false"
    );

    navigate('/login');

  };

  const navItems = [

    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard size={20} />
    },

    {
      name: 'Explore Cars',
      path: '/explore',
      icon: <Compass size={20} />
    },

    {
      name: 'Favorites',
      path: '/favorites',
      icon: <Heart size={20} />
    },

    {
      name: 'Bookings',
      path: '/bookings',
      icon: <Calendar size={20} />
    },

    {
      name: 'Payments',
      path: '/payments',
      icon: <CreditCard size={20} />
    }

  ];

  const bottomItems = [

    {
      name: 'Profile',
      path: '/profile',
      icon: <User size={20} />
    }

  ];

  const defaultAvatar =
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4";

  return (

    <>

      {/* MOBILE TOGGLE */}
      <button
        className="lg:hidden fixed top-5 left-6 z-50 p-2 bg-white dark:bg-slate-900 rounded-lg text-slate-800 dark:text-white shadow-lg border border-slate-200 dark:border-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >

        {isOpen
          ? <X size={24} />
          : <Menu size={24} />
        }

      </button>

      {/* MOBILE OVERLAY */}
      {isOpen && (

        <div
          className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />

      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 glass-panel flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >

        {/* LOGO */}
        <div className="h-24 flex items-center px-8 border-b border-slate-200 dark:border-white/10">

          <div className="flex items-center gap-3 text-slate-900 dark:text-white">

            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-[0_4px_15px_rgba(59,130,246,0.3)]">

              <Car
                size={28}
                className="text-white"
              />

            </div>

            <span className="text-2xl font-black tracking-tight">

              LUX
              <span className="text-blue-600 dark:text-blue-400">
                RYDE
              </span>

            </span>

          </div>

        </div>

        {/* USER INFO */}
        <div className="px-6 py-6 border-b border-slate-200 dark:border-white/10 flex items-center gap-4">

          <img
            src={
              userData.profileImage ||
              defaultAvatar
            }
            alt="User"
            className="w-14 h-14 rounded-full object-cover border-2 border-purple-500"
          />

          <div>

            <h3 className="font-bold text-slate-900 dark:text-white">

              {userData.name || "User"}

            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400">

              Premium Member

            </p>

          </div>

        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-8 overflow-y-auto">

          <div className="space-y-2">

            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">

              Main Menu

            </p>

            {navItems.map((item) => (

              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }
                `}
              >

                {item.icon}

                {item.name}

              </NavLink>

            ))}

          </div>

          {/* ACCOUNT */}
          <div className="mt-12 space-y-2">

            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">

              Account

            </p>

            {bottomItems.map((item) => (

              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/30'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }
                `}
              >

                {item.icon}

                {item.name}

              </NavLink>

            ))}

          </div>

        </nav>

        {/* LOGOUT */}
        <div className="p-6 border-t border-slate-200 dark:border-white/10">

          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors font-medium"
          >

            <LogOut size={20} />

            Log Out

          </button>

        </div>

      </aside>

    </>

  );

};

export default Sidebar;