import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { JourneyProvider } from './context/JourneyContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { ComparisonDrawer } from './components/common/ComparisonDrawer';
import { EmergencyModal } from './components/emergency/EmergencyModal';
import { RequestQuotationModal } from './components/hospitals/RequestQuotationModal';

import { HomePage } from './pages/HomePage';
import { HospitalDiscoveryPage } from './pages/HospitalDiscoveryPage';
import { HospitalDetailPage } from './pages/HospitalDetailPage';
import { DoctorDiscoveryPage } from './pages/DoctorDiscoveryPage';
import { DoctorDetailPage } from './pages/DoctorDetailPage';
import { HospitalComparisonPage } from './pages/HospitalComparisonPage';
import { TreatmentExplorerPage } from './pages/TreatmentExplorerPage';
import { CostCalculator } from './components/estimator/CostCalculator';
import { MediGuideChat } from './components/ai/MediGuideChat';
import { MedicalDocumentsPage } from './pages/MedicalDocumentsPage';
import { TravelPlannerPage } from './pages/TravelPlannerPage';
import { HotelFinderPage } from './pages/HotelFinderPage';
import { TransportPage } from './pages/TransportPage';
import { MedicalVisaPage } from './pages/MedicalVisaPage';
import { CityExplorerPage } from './pages/CityExplorerPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { EmergencySupportPage } from './pages/EmergencySupportPage';
import { PostTreatmentRecoveryPage } from './pages/PostTreatmentRecoveryPage';
import { PatientDashboardPage } from './pages/PatientDashboardPage';
import { HospitalDashboardPage } from './pages/HospitalDashboardPage';
import { HotelDashboardPage } from './pages/HotelDashboardPage';
import { TransportDashboardPage } from './pages/TransportDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TravelChecklistPage } from './pages/TravelChecklistPage';
import { Lock, ShieldAlert } from 'lucide-react';
import { useJourney } from './context/JourneyContext';

import { Hospital, Doctor } from './types';

const MainAppContent: React.FC = () => {
  const { user, role } = useAuth();
  const { hospitals, doctors } = useJourney();

  const [currentTab, setCurrentTab] = useState<string>('home');
  const [patientDashboardSection, setPatientDashboardSection] = useState<'OVERVIEW' | 'PROFILE' | 'REQUESTS' | 'APPOINTMENTS' | 'DOCUMENTS' | 'NOTIFICATIONS'>('OVERVIEW');
  const [sosModalOpen, setSosModalOpen] = useState<boolean>(false);
  const [quotationModalOpen, setQuotationModalOpen] = useState<boolean>(false);
  const [selectedHospitalForQuotation, setSelectedHospitalForQuotation] = useState<Hospital | null>(null);
  const [selectedHospitalDetail, setSelectedHospitalDetail] = useState<Hospital | null>(null);
  const [selectedDoctorDetail, setSelectedDoctorDetail] = useState<Doctor | null>(null);

  const activeHospitalDetail = selectedHospitalDetail || hospitals[0];
  const activeDoctorDetail = selectedDoctorDetail || doctors[0];

  const handleOpenQuotation = (hospital: Hospital) => {
    setSelectedHospitalForQuotation(hospital);
    setQuotationModalOpen(true);
  };

  const handleViewHospitalDetail = (hospital: Hospital) => {
    setSelectedHospitalDetail(hospital);
    setCurrentTab('hospital-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewDoctorDetail = (doctor: Doctor) => {
    setSelectedDoctorDetail(doctor);
    setCurrentTab('doctor-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      {/* 1. Mandatory Non-Diagnostic Disclaimer Top Banner */}
      <DisclaimerBanner />

      {/* 2. Global Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'patient-dashboard') {
            setPatientDashboardSection('OVERVIEW');
          }
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSOS={() => setSosModalOpen(true)}
        onOpenNotifications={() => {
          setPatientDashboardSection('NOTIFICATIONS');
          setCurrentTab('patient-dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 3. Main Dynamic Content Page */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            setCurrentTab={setCurrentTab}
            onSelectHospitalForQuotation={handleOpenQuotation}
            onViewHospitalDetails={handleViewHospitalDetail}
          />
        )}

        {currentTab === 'hospitals' && (
          <HospitalDiscoveryPage
            onSelectForQuotation={handleOpenQuotation}
            onViewDetails={handleViewHospitalDetail}
            onNavigateToComparison={() => setCurrentTab('compare')}
          />
        )}

        {currentTab === 'hospital-detail' && (
          <HospitalDetailPage
            hospital={activeHospitalDetail}
            onBack={() => setCurrentTab('hospitals')}
            onRequestQuotation={handleOpenQuotation}
            onSelectDoctor={handleViewDoctorDetail}
          />
        )}

        {currentTab === 'doctors' && (
          <DoctorDiscoveryPage
            onSelectDoctor={handleViewDoctorDetail}
            onRequestConsultation={handleViewDoctorDetail}
          />
        )}

        {currentTab === 'doctor-detail' && (
          <DoctorDetailPage
            doctor={activeDoctorDetail}
            onBack={() => setCurrentTab('doctors')}
            onRequestConsultationSuccess={() => setCurrentTab('patient-dashboard')}
          />
        )}

        {currentTab === 'compare' && (
          <HospitalComparisonPage
            onRequestQuotation={handleOpenQuotation}
            onNavigateToDiscovery={() => setCurrentTab('hospitals')}
          />
        )}

        {currentTab === 'treatments' && (
          <TreatmentExplorerPage
            onEstimateCost={() => setCurrentTab('estimator')}
            onRequestQuote={() => handleOpenQuotation(hospitals[0])}
            onFindHospitals={(treatmentId, city, budget) => {
              setCurrentTab('hospitals');
            }}
          />
        )}

        {currentTab === 'estimator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <CostCalculator
              onStartQuotationForHospital={(hospId) => {
                const target = hospitals.find((h) => h.id === hospId) || hospitals[0];
                handleOpenQuotation(target);
              }}
            />
          </div>
        )}

        {currentTab === 'ai-assistant' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <MediGuideChat />
          </div>
        )}

        {currentTab === 'documents' && (
          user ? (
            <MedicalDocumentsPage />
          ) : (
            <div className="max-w-md mx-auto my-16 p-8 bg-white border border-slate-200 rounded-3xl text-center space-y-4 shadow-sm animate-fadeIn">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Sign In to Access Medical Documents</h2>
              <p className="text-xs text-slate-500">
                Your medical documents and radiology imaging records are protected by encrypted patient isolation. Please sign in or register to view or upload documents.
              </p>
              <div className="flex gap-2 justify-center pt-2">
                <button onClick={() => setCurrentTab('login')} className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700">Sign In</button>
                <button onClick={() => setCurrentTab('register')} className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200">Register</button>
              </div>
            </div>
          )
        )}

        {currentTab === 'checklist' && <TravelChecklistPage />}

        {currentTab === 'planner' && <TravelChecklistPage />}

        {currentTab === 'hotels' && <HotelFinderPage />}

        {currentTab === 'transport' && <TransportPage />}

        {currentTab === 'visa' && <MedicalVisaPage />}

        {currentTab === 'cities' && (
          <CityExplorerPage
            onSelectCityHospitals={(city) => {
              setCurrentTab('hospitals');
            }}
          />
        )}

        {currentTab === 'reviews' && <ReviewsPage />}

        {currentTab === 'emergency' && <EmergencySupportPage />}

        {currentTab === 'recovery' && <PostTreatmentRecoveryPage />}

        {currentTab === 'how-it-works' && (
          <HowItWorksPage onStartJourney={() => setCurrentTab('planner')} />
        )}

        {currentTab === 'about' && <AboutPage />}

        {currentTab === 'contact' && <ContactPage />}

        {currentTab === 'patient-dashboard' && (
          user ? (
            <PatientDashboardPage 
              initialSection={patientDashboardSection}
              onNavigateTab={(tab) => setCurrentTab(tab)} 
            />
          ) : (
            <div className="max-w-md mx-auto my-16 p-8 bg-white border border-slate-200 rounded-3xl text-center space-y-4 shadow-sm animate-fadeIn">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Sign In Required</h2>
              <p className="text-xs text-slate-500">
                Please sign in to access your personal patient dashboard, hospital quotation requests, and medical itinerary.
              </p>
              <div className="flex gap-2 justify-center pt-2">
                <button onClick={() => setCurrentTab('login')} className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700">Sign In</button>
                <button onClick={() => setCurrentTab('register')} className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200">Register</button>
              </div>
            </div>
          )
        )}

        {currentTab === 'hospital-dashboard' && <HospitalDashboardPage />}

        {currentTab === 'hotel-dashboard' && <HotelDashboardPage />}

        {currentTab === 'transport-dashboard' && <TransportDashboardPage />}

        {currentTab === 'admin-dashboard' && (
          !user ? (
            <div className="max-w-md mx-auto my-16 p-8 bg-white border border-slate-200 rounded-3xl text-center space-y-4 shadow-sm animate-fadeIn">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Admin Sign In Required</h2>
              <p className="text-xs text-slate-500">
                Please sign in with administrator credentials to manage platform data.
              </p>
              <div className="flex gap-2 justify-center pt-2">
                <button onClick={() => setCurrentTab('login')} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800">Sign In</button>
              </div>
            </div>
          ) : user.role !== 'ADMIN' ? (
            <div className="max-w-md mx-auto my-16 p-8 bg-white border border-red-200 rounded-3xl text-center space-y-4 shadow-sm animate-fadeIn">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Admin Access Restricted</h2>
              <p className="text-xs text-slate-500">
                You are currently signed in as a <strong className="text-slate-800">{user.role}</strong>. Patient and non-admin users cannot access administrative platform controls.
              </p>
              <div className="flex gap-2 justify-center pt-2">
                <button onClick={() => setCurrentTab('login')} className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800">Switch to Admin Login</button>
                <button onClick={() => setCurrentTab('home')} className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200">Return to Portal</button>
              </div>
            </div>
          ) : (
            <AdminDashboardPage />
          )
        )}

        {currentTab === 'login' && (
          <LoginPage
            onNavigateRegister={() => setCurrentTab('register')}
            onLoginSuccess={() => setCurrentTab(user?.role === 'ADMIN' ? 'admin-dashboard' : 'patient-dashboard')}
          />
        )}

        {currentTab === 'register' && (
          <RegisterPage
            onNavigateLogin={() => setCurrentTab('login')}
            onRegisterSuccess={() => setCurrentTab('patient-dashboard')}
          />
        )}
      </main>

      {/* 4. Global Comparison Floating Bar */}
      {currentTab !== 'compare' && (
        <ComparisonDrawer onOpenComparisonPage={() => setCurrentTab('compare')} />
      )}

      {/* 5. 24/7 Emergency SOS Modal */}
      <EmergencyModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
        onNavigateToFullPage={() => {
          setSosModalOpen(false);
          setCurrentTab('emergency');
        }}
      />

      {/* 6. Hospital Quotation Request Modal */}
      <RequestQuotationModal
        hospital={selectedHospitalForQuotation || hospitals[0]}
        isOpen={quotationModalOpen}
        onClose={() => setQuotationModalOpen(false)}
        onSuccess={(id) => {
          setCurrentTab('patient-dashboard');
        }}
      />

      {/* 7. Footer */}
      <Footer
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSOS={() => setSosModalOpen(true)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <ComparisonProvider>
            <JourneyProvider>
              <MainAppContent />
            </JourneyProvider>
          </ComparisonProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
