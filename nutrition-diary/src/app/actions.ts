"use server";

import { SearchFoodItemNutrientsData, SearchListFoodItemData } from "./interfaces";
import { addToken, databaseReturnType, getTokenData, getTokenFromUserID, getUserInfo, loginUser, registerUser } from "./database";
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
    let result: databaseReturnType = await loginUser(username, password);

    if(result == undefined)
        return false;
    
    // Something went wrong and we have multiple users with the same username and password
    if(result.length > 1)
        return false;

    const user = result[0];
    // Something went wrong and the database didn't return a user id that we wanted
    if(user?.id == undefined)
        return false;

    // Check if there already is a token for this particular user
    result = await getTokenFromUserID(user.id);

    // If you found a token send that back instead of making a new one
    if(result != undefined && result.length > 0 && result[0]?.token != undefined) {
        const token = result[0].token;

        cookies().set("token", token);
    }
    else {
        // If it is, generate a new token for the user and save it a list with all tokens
        const token = uuidv4();
        
        // Add the token item to the database
        addToken(token, user.id);

        // Add the token cookie to the clients cookies
        cookies().set("token", token);
    }

    return true;
}

export async function RegisterUser(username: string, password: string, confirmPassword: string, weight: number = 0, length: number = 0): Promise<string> {
    // Check if there is already a user with this username, and then return if there is
    const users = await getUserInfo(undefined, username);

    if(users != undefined && users.length > 0){
        console.log("User already exists")
        return "User already exists!";
    }

    // Validate the username and password that you just got
    if(password != confirmPassword || password.length < 8 || username.length < 4){
        console.log("Password or username is not valid")
        return "Password or username is not valid";
    }
    
    // Register the user in the database and redirect the client to the login page
    registerUser(username, password);
    return "User registered successfully";
}