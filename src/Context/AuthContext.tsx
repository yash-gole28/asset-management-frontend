import React, { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { API } from '../network';
import { apiList } from '../apiList';
import { useNavigate } from 'react-router-dom';

interface MyContextType {
    value: string;
    type: string;
    username:string;
    setValue: (newValue: string) => void;
    setType: (newValue: string) => void;
    getCurrentUser: () => Promise<void>;
    getAdmin: () => Promise<void>;
    getitRole:() => Promise<void>;
    setUserName:(newValue: string) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [value, setValue] = useState<string>('');
    const [type , setType] = useState<string>('')
    const [username , setUserName] = useState<string>('')
    const router = useNavigate()
    const getCurrentUser =async()=>{
      try{
        const url = apiList.getCurrentUser
        const response = await API.get(url)
        if(response.data.success){
          setValue(response.data.user._id)
          setType(response.data.user.role)
          setUserName(`${response.data.user.firstName} ${response.data.user.lastName}`)
        }else{
          toast.error(response.data.message)
        }
      }catch(err:any){
        toast('session expired')
     
        router('/login')
  
      }
    }
    const getAdmin = async () => {
      try{
        const url = apiList.getCurrentUser
        const response = await API.get(url)
        if(response.data.success){
          if(response.data.user.role === 'admin'){
            console.log(response.data.user.role)
            setValue(response.data.user._id)
            setType(response.data.user.role)
          }else{
            toast.error('You are not an admin')
            router('/')
          }
         
          
        }else{
          toast.error(response.data.message)
        }
      }catch(err:any){
        toast('session expired')
        console.log(err)
        router('/login')
  
      }
    }
    const getitRole = async()=>{
      try{
        const url = apiList.getCurrentUser
        const response = await API.get(url)
        if(response.data.success){
          if(response.data.user.role === 'admin'  || response.data.user.role === 'it'){
            console.log(response.data.user.role)
            setValue(response.data.user._id)
            setType(response.data.user.role)
          }else{
            toast.error('You are not allowed')
            router('/')
          }
         
          
        }else{
          toast.error(response.data.message)
        }
      }catch(err:any){
        toast('session expired')
        console.log(err)
        router('/login')
  
      }
    }

    return (
        <MyContext.Provider value={{ value, setValue ,getCurrentUser,setType,getAdmin , type, getitRole , username , setUserName}}>
            {children}
        </MyContext.Provider>
    );
};

// Export context and provider
export { MyContext, MyProvider };