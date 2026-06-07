import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex text-slate-800 dark:text-slate-100 bg-transparent min-h-screen">
      {/* Sidebar remains fixed */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 relative lg:ml-72 w-full">
        {/* Modern SaaS background gradients - fixed to not scroll with content */}
        <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-300/30 dark:bg-blue-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] pointer-events-none animate-pulse duration-10000"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-300/30 dark:bg-purple-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[150px] pointer-events-none animate-pulse duration-10000 delay-1000"></div>
        <div className="fixed top-[40%] left-[20%] w-[30vw] h-[30vw] bg-teal-300/20 dark:bg-teal-500/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] pointer-events-none"></div>

        <Navbar />
        
        <main className="flex-1 relative z-10 p-6 lg:p-10">
          <div className="max-w-7xl mx-auto w-full animate-in fade-in duration-700 slide-in-from-bottom-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
