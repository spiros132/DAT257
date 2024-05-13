"use client";
import { startTransition } from "react";
import { LogoutUser } from "@/app/actions/users";

export default function Page(){
    startTransition(() => {
        LogoutUser();
        console.log("LOGOUT");
    });

    return(
        <>
        Logging Out...
        </>
    )
} 
