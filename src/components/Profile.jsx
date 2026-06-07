import { useState, useRef, useEffect } from 'react';

import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Settings,
  Bell,
  Shield,
  Save
} from 'lucide-react';

const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    profileImage: null
  });

  const fileInputRef = useRef(null);

  // LOAD USER PROFILE FROM DATABASE
  useEffect(() => {

    const fetchUserProfile = async () => {

      try {

        const user = JSON.parse(
          localStorage.getItem("user")
        );

        if (!user?.email) return;

        const response = await fetch(
          `http://localhost:8080/auth/user/${user.email}`
        );

        const data = await response.json();

        setUserData(data);

        // UPDATE LOCAL STORAGE
        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        // UPDATE NAVBAR & SIDEBAR
        window.dispatchEvent(
          new Event("userUpdated")
        );

      } catch (error) {

        console.error(error);

      }

    };

    fetchUserProfile();

  }, []);

  // SAVE PROFILE TO DATABASE
  const handleSave = async () => {

    try {

      const response = await fetch(

        `http://localhost:8080/auth/update/${userData.email}`,

        {

          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(userData)

        }

      );

      const updatedUser =
        await response.json();

      // SAVE UPDATED USER
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      // UPDATE UI
      setUserData(updatedUser);

      window.dispatchEvent(
        new Event("userUpdated")
      );

      setIsEditing(false);

      alert("Profile updated successfully!");

    } catch (error) {

      console.error(error);

      alert("Failed to update profile");

    }

  };

  // HANDLE IMAGE UPLOAD
  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onloadend = () => {

        setUserData({

          ...userData,

          profileImage: reader.result

        });

      };

      reader.readAsDataURL(file);

    }

  };

  const defaultAvatar =
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4";

  return (

    <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-10">

      {/* HEADER */}
      <div>

        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">

          My Profile

        </h1>

        <p className="text-slate-500 dark:text-slate-400">

          Manage your account details and preferences.

        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-1 flex flex-col gap-6">

          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">

            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-200/50 to-purple-200/50 dark:from-blue-600/50 dark:to-purple-600/50 z-0"></div>

            <div className="relative z-10 flex flex-col items-center mt-12">

              {/* PROFILE IMAGE */}
              <div className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xl mb-4 relative">

                <img
                  src={
                    userData.profileImage ||
                    defaultAvatar
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                <button
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="absolute bottom-0 inset-x-0 h-1/3 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >

                  <Edit3
                    size={16}
                    className="text-white"
                  />

                </button>

              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                {userData.name || 'User'}

              </h2>

              <p className="text-slate-500 dark:text-slate-400">

                Premium Member

              </p>

              <div className="flex items-center gap-2 mt-4 px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">

                <Shield size={16} />

                Verified Account

              </div>

            </div>

            {/* PROFILE DETAILS */}
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10 space-y-4">

              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">

                <Mail
                  size={18}
                  className="text-slate-400 dark:text-slate-500"
                />

                <span>

                  {userData.email || 'Not provided'}

                </span>

              </div>

              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">

                <Phone
                  size={18}
                  className="text-slate-400 dark:text-slate-500"
                />

                <span>

                  {userData.phone || 'Not provided'}

                </span>

              </div>

              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">

                <MapPin
                  size={18}
                  className="text-slate-400 dark:text-slate-500"
                />

                <span>

                  {userData.location || 'Not provided'}

                </span>

              </div>

            </div>

            {/* EDIT BUTTON */}
            <button
              onClick={() =>
                setIsEditing(!isEditing)
              }
              className="w-full mt-8 py-3 rounded-xl font-medium text-slate-700 dark:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >

              <Edit3 size={18} />

              {isEditing
                ? 'Cancel Editing'
                : 'Edit Profile'}

            </button>

          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* EDIT FORM */}
          {isEditing ? (

            <div className="glass-panel p-8 rounded-3xl animate-in fade-in slide-in-from-top-4">

              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">

                <User className="text-blue-600 dark:text-blue-400" />

                Edit Information

              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* NAME */}
                <div>

                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">

                    Full Name

                  </label>

                  <input
                    type="text"
                    value={userData.name || ''}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        name: e.target.value
                      })
                    }
                    className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-200 rounded-xl px-4 py-3"
                  />

                </div>

                {/* EMAIL */}
                <div>

                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">

                    Email

                  </label>

                  <input
                    type="email"
                    value={userData.email || ''}
                    disabled
                    className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 rounded-xl px-4 py-3 cursor-not-allowed"
                  />

                </div>

                {/* PHONE */}
                <div>

                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">

                    Phone

                  </label>

                  <input
                    type="tel"
                    value={userData.phone || ''}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        phone: e.target.value
                      })
                    }
                    className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-200 rounded-xl px-4 py-3"
                  />

                </div>

                {/* LOCATION */}
                <div>

                  <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">

                    Location

                  </label>

                  <input
                    type="text"
                    value={userData.location || ''}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        location: e.target.value
                      })
                    }
                    className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-200 rounded-xl px-4 py-3"
                  />

                </div>

              </div>

              {/* SAVE BUTTON */}
              <div className="mt-8 flex justify-end">

                <button
                  onClick={handleSave}
                  className="px-6 py-3 rounded-xl flex items-center gap-2 btn-glow"
                >

                  <Save size={18} />

                  Save Changes

                </button>

              </div>

            </div>

          ) : null}

          {/* SETTINGS PANEL */}
          <div className="glass-panel p-8 rounded-3xl">

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">

              <Settings className="text-purple-600 dark:text-purple-400" />

              Account Settings

            </h3>

            <div className="space-y-2">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">

                <div className="flex items-center gap-4 mb-4 sm:mb-0">

                  <div className="p-3 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">

                    <Bell size={20} />

                  </div>

                  <div>

                    <h4 className="font-medium text-slate-900 dark:text-slate-200">

                      Push Notifications

                    </h4>

                    <p className="text-sm text-slate-500 dark:text-slate-400">

                      Receive alerts for your bookings

                    </p>

                  </div>

                </div>

                <label className="relative inline-flex items-center cursor-pointer">

                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />

                  <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 rounded-full peer peer-checked:bg-blue-600"></div>

                </label>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Profile;