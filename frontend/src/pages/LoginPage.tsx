import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { 
  HeartPulse, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Building2,
  Hotel,
  Car
} from 'lucide-react';

interface LoginPageProps {
  onNavigateRegister: () => void;
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigateRegister, onLoginSuccess }) => {
  const { login, resetToDemoAhmed } = useAuth();
  const [email, setEmail] = useState('ahmed.hossain@demo.bd');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('PATIENT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
    onLoginSuccess();
  };

  const handleQuickDemoLogin = (role: UserRole, demoEmail: string) => {
    setSelectedRole(role);
    setEmail(demoEmail);
    login(demoEmail, role);
    onLoginSuccess();
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-500 text-white flex items-center justify-center mx-auto shadow-md">
          <HeartPulse className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Sign In to MEDTRAVEL INDIA
        </h1>
        <p className="text-xs text-slate-500">
          Access your medical journey files, hospital quotations, and travel vouchers
        </p>
      </div>

      {/* Quick 1-Click Role Logins for Demonstrators */}
      <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 space-y-2">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block text-center">
          ⚡ 1-Click Role Switch & Demo Credentials
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('PATIENT', 'ahmed.hossain@demo.bd')}
            className="p-2 bg-white hover:bg-brand-50 border border-slate-200 rounded-xl font-bold text-slate-800 text-left transition"
          >
            👤 Patient (Ahmed)
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('HOSPITAL', 'chennai_intl@apollohospitals.demo')}
            className="p-2 bg-white hover:bg-brand-50 border border-slate-200 rounded-xl font-bold text-slate-800 text-left transition"
          >
            🏥 Apollo Hospital
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('HOTEL', 'guestcare@lemontree.demo')}
            className="p-2 bg-white hover:bg-brand-50 border border-slate-200 rounded-xl font-bold text-slate-800 text-left transition"
          >
            🏨 Lemon Tree Hotel
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('ADMIN', 'admin@medtravelindia.demo')}
            className="p-2 bg-white hover:bg-brand-50 border border-slate-200 rounded-xl font-bold text-slate-800 text-left transition"
          >
            🛡️ Platform Admin
          </button>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Select Persona Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
            >
              <option value="PATIENT">International Patient / Attendant</option>
              <option value="HOSPITAL">Hospital International Coordinator</option>
              <option value="HOTEL">Hotel / Accommodation Partner</option>
              <option value="TRANSPORT_PARTNER">Transportation / Chauffeur Partner</option>
              <option value="ADMIN">Platform Administrator</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md transition text-xs flex items-center justify-center gap-1.5"
          >
            <span>Log In to Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <button
            onClick={onNavigateRegister}
            className="font-bold text-brand-600 hover:text-brand-700 underline"
          >
            Register Patient Profile
          </button>
        </div>
      </div>
    </div>
  );
};
