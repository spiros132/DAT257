"use server";

import { SearchFoodItemNutrientsData, SearchListFoodItemData } from "./interfaces";
import { getUserInfo, loginUser, registerUser } from "./database";
import { cookies } from "next/headers";
import { use } from "react";
import { get } from "http";

export async function SearchForFood(foodname: string): Promise<string | undefined> {
    const id = process.env.X_APP_ID;
    const key = process.env.X_APP_KEY;

    if(id == undefined || key == undefined) {
        return undefined;
    }
    else {
        // URL
        const url: string = "https://trackapi.nutritionix.com/v2/natural/nutrients";

        // Headers required
        const myHeaders = new Headers();
        myHeaders.append("x-app-id", id);
        myHeaders.append("x-app-key", key);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        // Body
        const urlencoded = new URLSearchParams();
        urlencoded.append("query", foodname);
    
        // Request options
        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow"
        };
    
        const res = await fetch(url, requestOptions);

        const json = await res.json();
        const obj = new SearchFoodItemNutrientsData();
        
        // Assign the json data to the an object
        Object.assign(obj, json);
        
        // Error checking
        
        // Return the json of the response body
        return JSON.stringify(obj);
    }
}

export async function SearchForFoodList(foodname: string): Promise<string | undefined> {
    const id = process.env.X_APP_ID;
    const key = process.env.X_APP_KEY;

    if(id == undefined || key == undefined) {
        return undefined;
    }
    else {
        // URL
        const url: string = "https://trackapi.nutritionix.com/v2/search/instant?query="+foodname;

        // Headers required
        const myHeaders = new Headers();
        myHeaders.append("x-app-id", id);
        myHeaders.append("x-app-key", key);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        // Request options
        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
    
        const res = await fetch(url, requestOptions);

        const json = await res.json();
        const obj = new SearchListFoodItemData();
        
        // Assign the json data to the an object
        Object.assign(obj, json)

        // Error checking

        // Return the json of the response body
        return JSON.stringify(obj);
    }
}

export async function Login(username: string, password: string): Promise<boolean> {
    // Check if the username and password are correct in the database
    //users[] = getUserInfo(username);

    // If it is, generate a new token for the user and save it a list with all tokens

    // Return the token in a cookie to the user
    // Or return an error based on if it's correct or not
    //loginUser(username, password);
    
   // return true;
}

export async function RegisterUser(formData) {
    // Check if there is already a user with this username, and then return if there is
    var username = formData.get("username");
    var password = formData.get("password");
    var confirmationPassword = formData.get("confirmPassword");
    var users = await getUserInfo(username);

    if(users.length > 0){
        console.log("User already exists")
        return false;
    };
    // Validate the username and password that you just got
    if(password != confirmationPassword || password.length < 8 || username.length < 4){
        console.log("Password or username is not valid")
        return false;
    }
    // Register the user in the database and redirect the client to the login page
    registerUser(username, password);
    // Or return an error based on if it's correct or not
    console.log("User registered")
    return true;
}