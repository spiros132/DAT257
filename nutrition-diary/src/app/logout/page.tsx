"use client";
import { startTransition } from "react";
import { LogoutUser } from "@/app/actions/users";

export default function Page(){

    window.onload = function() {
        startTransition(() => {
            LogoutUser()
            .then();
        });
    }

    return(
        <>
        Logging Out...
        </>
    )
} 
