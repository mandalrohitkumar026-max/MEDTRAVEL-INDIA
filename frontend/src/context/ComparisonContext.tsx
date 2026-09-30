import React, { createContext, useContext, useState } from 'react';

interface ComparisonContextType {
  selectedHospitalIds: string[];
  toggleHospital: (id: string) => void;
  removeHospital: (id: string) => void;
  clearComparison: () => void;
  isInComparison: (id: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedHospitalIds, setSelectedHospitalIds] = useState<string[]>([
    'hosp-apollo-chennai',
    'hosp-mgm-chennai',
    'hosp-miot-chennai'
  ]);

  const toggleHospital = (id: string) => {
    setSelectedHospitalIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 hospitals at a time.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const removeHospital = (id: string) => {
    setSelectedHospitalIds((prev) => prev.filter((item) => item !== id));
  };

  const clearComparison = () => {
    setSelectedHospitalIds([]);
  };

  const isInComparison = (id: string) => {
    return selectedHospitalIds.includes(id);
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedHospitalIds,
        toggleHospital,
        removeHospital,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
