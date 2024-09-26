import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MyContextType {
    value: string;
    setValue: (newValue: string) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [value, setValue] = useState<string>('Hello, World!');

    return (
        <MyContext.Provider value={{ value, setValue }}>
            {children}
        </MyContext.Provider>
    );
};

// Export context and provider
export { MyContext, MyProvider };