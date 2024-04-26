"use client";
import SearchBar from "@/components/SearchBar";
import ResultDisplay from "@/components/ResultDisplay";
import React, {startTransition, useState} from "react";
import { SearchForFood } from "./actions";
import LoginPage from "@/pages/LoginPage";
import MenuPage from "@/pages/MenuPage";
import CreateAccountPage from "@/pages/CreateAccountPage";
import AppRouter from "@/AppRouter";
// import { useHistory } from 'react-router-dom';


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
         
           <CreateAccountPage/>
           




           
    </main>
  );
}
