"use client";

import { useEffect } from "react";
import { deleteSession } from "../lib/session";


export default function LogoutPage() {

    useEffect(() => {
        deleteSession();
    })

    return (
        <p
        className="">
        Logging out...
        </p>
    );
}