import React, { useState } from 'react';
import { 
  Building2, 
  Stethoscope, 
  Compass, 
  Hotel as HotelIcon, 
  Car, 
  Bot, 
  FileText, 
  FileCheck2, 
  ShieldAlert, 
  User, 
  Globe, 
  Coins, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  Layers,
  HeartPulse,
  LayoutDashboard,
  Bell,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useComparison } from '../../context/ComparisonContext';
import { useJourney } from '../../context/JourneyContext';
import { LanguageCode, CurrencyCode, UserRole } from '../../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenSOS: () => void;
  onOpenNotifications?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onOpenSOS, onOpenNotifications }) => {
  const { user, role, setRole, logout, resetToDemoAhmed } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const { selectedHospitalIds } = useComparison();
  const { notifications } = useJourney();
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const primaryNavLinks = [
    { id: 'home', label: 'Home' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'hospitals', label: 'Hospitals' },
    { id: 'compare', label: `Compare (${selectedHospitalIds.length}/3)` },
    { id: 'estimator', label: 'Cost Estimator' },
    { id: 'documents', label: 'My Documents' },
    { id: 'checklist', label: 'Travel Checklist' },
    { id: 'ai-assistant', label: 'MediGuide AI', highlight: true },
  ];

  const moreNavLinks = [
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Support' },
  ];

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  const getDashboardTarget = () => {
    switch (role) {
      case 'HOSPITAL':
        return 'hospital-dashboard';
      case 'HOTEL':
        return 'hotel-dashboard';
      case 'TRANSPORT_PARTNER':
        return 'transport-dashboard';
      case 'ADMIN':
        return 'admin-dashboard';
      default:
        return 'patient-dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Bar for Multilingual, Currency, Demo Persona, and Quick SOS */}
      <div className="bg-slate-50 border-b border-slate-100 py-1.5 px-4 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Demo Scenario Indicator */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Demo: Ahmed (Cardiac • Chennai)
            </span>
            <button
              onClick={() => {
                resetToDemoAhmed();
                setCurrentTab('patient-dashboard');
              }}
              className="text-brand-700 hover:text-brand-800 hover:underline font-medium text-[11px]"
              title="Loads Ahmed from Bangladesh with CABG in Chennai demo flow"
            >
              Reset Ahmed Journey
            </button>
          </div>

          {/* Right Controls: Role Switcher, Currency, Language, SOS */}
          <div className="flex items-center gap-2.5 ml-auto">
            {/* Currency Selector */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-2xs">
              <Coins className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent text-slate-700 font-medium focus:outline-hidden text-xs cursor-pointer"
                aria-label="Select currency"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="BDT">BDT (৳)</option>
                <option value="EUR">EUR (€)</option>
                <option value="AED">AED (د.إ)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-transparent text-slate-700 font-medium focus:outline-hidden text-xs cursor-pointer"
                aria-label="Select language"
              >
                <option value="en">English (EN)</option>
                <option value="bn">বাংলা (BN)</option>
                <option value="hi">हिंदी (HI)</option>
                <option value="ar">العربية (AR)</option>
                <option value="fr">Français (FR)</option>
                <option value="es">Español (ES)</option>
                <option value="ru">Русский (RU)</option>
              </select>
            </div>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 bg-brand-50 hover:bg-brand-100/80 text-brand-900 border border-brand-200 px-2.5 py-1 rounded-lg font-semibold transition text-xs"
              >
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
                <span>Role: {role.replace('_', ' ')}</span>
                <ChevronDown className="w-3 h-3 text-brand-600" />
              </button>

              {roleDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1.5 animate-fadeIn"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Active Persona
                  </div>
                  <button
                    onClick={() => { setRole('PATIENT'); setCurrentTab('patient-dashboard'); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${role === 'PATIENT' ? 'font-bold text-brand-700 bg-brand-50/50' : 'text-slate-700'}`}
                  >
                    <span>Patient (Ahmed Hossain)</span>
                    {role === 'PATIENT' && <span className="text-[10px] text-brand-600">● Active</span>}
                  </button>
                  <button
                    onClick={() => { setRole('HOSPITAL'); setCurrentTab('hospital-dashboard'); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${role === 'HOSPITAL' ? 'font-bold text-brand-700 bg-brand-50/50' : 'text-slate-700'}`}
                  >
                    <span>Hospital Desk (Apollo Chennai)</span>
                    {role === 'HOSPITAL' && <span className="text-[10px] text-brand-600">● Active</span>}
                  </button>
                  <button
                    onClick={() => { setRole('HOTEL'); setCurrentTab('hotel-dashboard'); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${role === 'HOTEL' ? 'font-bold text-brand-700 bg-brand-50/50' : 'text-slate-700'}`}
                  >
                    <span>Hotel Desk (Lemon Tree)</span>
                    {role === 'HOTEL' && <span className="text-[10px] text-brand-600">● Active</span>}
                  </button>
                  <button
                    onClick={() => { setRole('TRANSPORT_PARTNER'); setCurrentTab('transport-dashboard'); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${role === 'TRANSPORT_PARTNER' ? 'font-bold text-brand-700 bg-brand-50/50' : 'text-slate-700'}`}
                  >
                    <span>Transport (MedRoute Mobility)</span>
                    {role === 'TRANSPORT_PARTNER' && <span className="text-[10px] text-brand-600">● Active</span>}
                  </button>
                  <button
                    onClick={() => { setRole('ADMIN'); setCurrentTab('admin-dashboard'); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${role === 'ADMIN' ? 'font-bold text-brand-700 bg-brand-50/50' : 'text-slate-700'}`}
                  >
                    <span>Super Admin Platform</span>
                    {role === 'ADMIN' && <span className="text-[10px] text-brand-600">● Active</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Quick Emergency SOS button */}
            <button
              onClick={onOpenSOS}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-bold px-2.5 py-1 rounded-lg text-xs shadow-sm transition"
              title="24/7 India Emergency Medical Assistance"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>SOS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Tagline */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-brand-700 transition">
                  MEDTRAVEL
                </span>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-teal-600">
                  INDIA
                </span>
              </div>
              <p className="hidden sm:block text-[10px] text-slate-500 font-medium tracking-wide">
                From Airport to Recovery
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-medium text-slate-600">
            {primaryNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`px-2.5 py-1.5 rounded-lg transition relative ${
                  currentTab === link.id
                    ? 'text-brand-700 font-bold bg-brand-50/70'
                    : 'hover:text-slate-900 hover:bg-slate-100/70'
                } ${link.highlight ? 'text-teal-700 font-semibold' : ''}`}
              >
                {link.highlight && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 mr-1.5"></span>
                )}
                {link.label}
              </button>
            ))}

            {/* More Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition ${
                  moreNavLinks.some(l => l.id === currentTab)
                    ? 'text-brand-700 font-bold bg-brand-50/70'
                    : 'hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <span>Services & Guides</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {moreDropdownOpen && (
                <div 
                  className="absolute left-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1.5 animate-fadeIn"
                  onClick={() => setMoreDropdownOpen(false)}
                >
                  {moreNavLinks.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 transition flex items-center justify-between ${
                        currentTab === item.id ? 'font-bold text-brand-700 bg-brand-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{item.label}</span>
                      {currentTab === item.id && <span className="text-[10px] text-brand-600">●</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Notification Bell Button */}
            <button
              onClick={() => {
                if (onOpenNotifications) {
                  onOpenNotifications();
                } else {
                  handleNav('patient-dashboard');
                }
              }}
              className="relative p-2 rounded-xl text-slate-600 hover:text-brand-700 hover:bg-slate-100 transition"
              title="Journey Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav(getDashboardTarget())}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                  title={`Logged in as ${user.name} (${role})`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded font-bold uppercase text-slate-600">{role === 'TRANSPORT_PARTNER' ? 'Transport' : role}</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setCurrentTab('login');
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="Sign out of account"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleNav('login')}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 transition"
                >
                  Register
                </button>
              </div>
            )}

            <button
              onClick={() => handleNav('planner')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-md shadow-brand-600/20 transition hover:scale-102"
            >
              <span>Start Journey</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex xl:hidden items-center gap-1.5">
            <button
              onClick={() => {
                if (onOpenNotifications) {
                  onOpenNotifications();
                } else {
                  handleNav('patient-dashboard');
                }
              }}
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNav(getDashboardTarget())}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 text-xs"
              aria-label="Portal Dashboard"
            >
              <LayoutDashboard className="w-4 h-4 text-brand-600" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn max-h-[80vh] overflow-y-auto">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Main Navigation</div>
            <div className="grid grid-cols-2 gap-2">
              {primaryNavLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                    currentTab === link.id
                      ? 'bg-brand-50 text-brand-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Services & Travel Guides</div>
            <div className="grid grid-cols-2 gap-2">
              {moreNavLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                    currentTab === link.id
                      ? 'bg-brand-50 text-brand-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2 border-t border-slate-100">
            {user ? (
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <div className="font-bold text-slate-800">{user.name}</div>
                  <div className="text-[10px] text-slate-500 capitalize">{role.toLowerCase().replace('_', ' ')} account</div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    handleNav('login');
                  }}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded-lg font-bold text-xs hover:bg-red-100"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="py-2.5 rounded-xl border border-slate-200 text-slate-800 font-semibold text-xs text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs text-center"
                >
                  Register
                </button>
              </div>
            )}
            <button
              onClick={() => handleNav('planner')}
              className="w-full text-center py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-xs shadow-sm"
            >
              Start Medical Journey Planner
            </button>
            <button
              onClick={() => handleNav('documents')}
              className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs"
            >
              Medical Document Vault
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
