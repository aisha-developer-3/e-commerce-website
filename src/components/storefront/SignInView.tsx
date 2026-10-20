import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export const SignInView: React.FC = () => {
  const {
    loginWithEmail,
    setRoute,
    showToast,
  } = useStore();

  const [gmailOrEmail, setGmailOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const email = gmailOrEmail.trim();
    if (!email) {
      showToast('Please enter your Gmail / Email', 'error');
      return;
    }
    if (!password.trim()) {
      showToast('Please enter your password', 'error');
      return;
    }

    const res = loginWithEmail(email, password);
    if (!res.success) {
      return;
    }

    // Admin email opens Admin Portal; any other email opens User Site
    if (res.isAdmin) {
      setRoute('admin-dashboard');
      showToast('Welcome Admin! Admin Portal opened.', 'success');
    } else {
      setRoute('home');
      showToast(`Welcome! User site opened.`, 'info');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12 sm:py-20 bg-[#fdfbf7]">
      <div className="w-full max-w-md bg-[#faf6f0] border border-[#ede4d8] rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-1">
          <div className="w-12 h-12 rounded-full bg-[#26201c] flex items-center justify-center text-[#faf6f0] shadow-xs mb-1">
            <span className="font-serif text-2xl font-bold">A</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#26201c] font-semibold tracking-tight">
            Sign In
          </h1>
        </div>

        {/* The Sign In Form with Gmail, Password, and Sign In button */}
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          {/* 1. Gmail / Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider font-semibold text-[#26201c]">
              Gmail / Email
            </label>
            <input
              type="email"
              value={gmailOrEmail}
              onChange={(e) => setGmailOrEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
              className="w-full h-12 px-4 bg-white border border-[#ede4d8] rounded-xl text-sm text-[#26201c] placeholder:text-[#9e9187] focus:outline-none focus:border-[#b86b43]"
            />
          </div>

          {/* 2. Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-wider font-semibold text-[#26201c]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full h-12 px-4 bg-white border border-[#ede4d8] rounded-xl text-sm text-[#26201c] placeholder:text-[#9e9187] focus:outline-none focus:border-[#b86b43]"
            />
          </div>

          {/* 3. Sign In Button */}
          <button
            type="submit"
            className="w-full mt-2 py-4 bg-[#26201c] hover:bg-[#b86b43] text-white text-sm font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In</span>
            <span className="material-symbols-outlined text-[18px]">login</span>
          </button>
        </form>

      </div>
    </div>
  );
};
