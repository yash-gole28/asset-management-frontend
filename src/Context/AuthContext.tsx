import React, { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { API } from '../network';
import { apiList } from '../apiList';
import { useNavigate } from 'react-router-dom';

interface MyContextType {
    value: string;
    setValue: (newValue: string) => void;
    getCurrentUser: () => Promise<void>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [value, setValue] = useState<string>('');
    const router = useNavigate()
    const getCurrentUser =async()=>{
      try{
        const url = apiList.getCurrentUser
        const response = await API.get(url)
        if(response.data.success){
          setValue(response.data.user._id)
          toast(response.data.user.firstName)
          // setUser(response.user.firstName)
        }else{
          toast.error(response.data.message)
        }
      }catch(err:any){
        toast('session expired')
        // console.log(err)
        router('/login')
  
      }
    }
    return (
        <MyContext.Provider value={{ value, setValue ,getCurrentUser}}>
            {children}
        </MyContext.Provider>
    );
};

// Export context and provider
export { MyContext, MyProvider };