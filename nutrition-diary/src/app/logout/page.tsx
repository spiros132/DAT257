"use client";
import { startTransition } from "react";
import { LogoutUser } from "@/app/actions/users";

export default function Page(){
    window.onload = () => {
        startTransition(() => {
            LogoutUser();
        });
    }

    return(
        <>
        Logging Out...
        </>
    )
} 
