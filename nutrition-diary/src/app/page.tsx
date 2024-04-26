"use client";
import SearchBar from "@/components/SearchBar";
import ResultDisplay from "@/components/ResultDisplay";
import React, {startTransition, useState} from "react";
import { SearchForFood } from "./actions";
import LoginPage from "@/pages/LoginPage";
import MenuPage from "@/pages/MenuPage";
import CreateAccountPage from "@/pages/CreateAccountPage";
import AppRouter from "@/AppRouter";
import ProfilePage from "@/pages/Profile";
// import { useHistory } from 'react-router-dom';
import profilePage1 from "@/pages/ProfilePage1";
import MainPage from "@/pages/MainPage";
import Approuter from "@/pages/Approuter"


export default function App() { {/** Home */}
  const App: React.FC = () => { {/** added */}
    return <AppRouter />;
  };

  const onSearch = (searchInput: string) => { fetchData(searchInput); };
  const [result, setResult] = useState<string>('');

  function fetchData(searchInput: string){
    startTransition(() => {
      SearchForFood(searchInput)
      .then((res: string | undefined) => {
        if(res != undefined)
          setResult(res);
      })
      .catch((error: Error) => {
        console.log(error);
      });
    });
  }
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat&display=swap"></link>
  
  

  return (
<main className="flex h-screen flex-col items-center justify-between p-24 ">
           {/* <LoginPage/>  */}
           {/*  <MenuPage/> */}
           {/** <CreateAccountPage/> */}
           {/** <ProfilePage/> greentheme  */}
           {/** <MainPage/>  */}

           <ProfilePage/>

      
    </main>
  );
}
