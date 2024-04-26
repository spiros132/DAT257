"use server";

import { SearchFoodItemNutrientsData, SearchListFoodItemData } from "./interfaces";
import { addToken, databaseReturnType, getToken, getUserInfo, loginUser, registerUser } from "./database";
import { cookies } from "next/headers";
import { use } from "react";
import { get } from "http";
import { v4 as uuidv4 } from 'uuid';

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

// WIP!!!
// gives a list of meals with the calories
// export async function GetMealList(username: string, )


export async function Login(username: string, password: string): Promise<boolean> {
    // Check if the username and password are correct in the database    
    const result: databaseReturnType = await loginUser(username, password);

    if(result == undefined)
        return false;
    
    // Something went wrong and we have multiple users with the same username and password
    if(result.length > 1)
        return false;

    const user = result[0];
    // Something went wrong and the database didn't return a user id that we wanted
    if(user?.id == undefined)
        return false;

    // If it is, generate a new token for the user and save it a list with all tokens
    const token = uuidv4();
    
    // Add the token item to the database
    addToken(token, user.id);

    // Add the token cookie to the clients cookies
    cookies().set("token", token);
    
    return true;
}

export async function RegisterUser(formData : FormData): Promise<boolean> {
    // Check if there is already a user with this username, and then return if there is
    let username = String(formData.get("username"));
    let password = String(formData.get("password"));
    let confirmationPassword = String(formData.get("confirmPassword"));
    let users = await String(getUserInfo(username));

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