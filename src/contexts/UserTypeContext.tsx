import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserType = 'business' | 'investor' | 'incubator';

export interface UserTypeContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

export const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined);

export const UserTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>('business');

  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = () => {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
};