"use server";

import { redirect } from "next/navigation";
import { SearchFoodItemNutrientsData, SearchListFoodItemData } from "../lib/definitions";
import { databaseReturnType, getTokenData, getUserInfo, loginUser, registerUser } from "../lib/database";
import { cookies } from "next/headers";
import { createSession, deleteSession } from "../lib/session";

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


export async function GetUserID(token: string): Promise<number> {
    const userID = await getTokenData(token);

    if(userID == undefined)
        return -1;

    if(userID.length != 1)
        return -1;

    const user = userID[0];
    if(user?.id == undefined)
        return -1;

    return user.id;
}


export async function Login(username: string, password: string): Promise<string> {
    // Check if the username and password are correct in the database    
    let result: databaseReturnType = await loginUser(username, password);

    // Helper function so that we don't write the same code in all of those
    function returnError(error: string) {
        deleteSession();
        return error;
    }

    if(result == undefined)
        return returnError("Username or password is incorrect!");
    
    // Something went wrong and we have multiple users with the same username and password
    if(result.length > 1)
        return returnError("Server error!");

    const user = result[0];
    // Something went wrong and the database didn't return a user id that we wanted
    if(user?.id == undefined)
        return returnError("Username or password is incorrect!");

    createSession(user.id);

    redirect('/dashboard');
}

export async function RegisterUser(username: string, password: string, confirmPassword: string, weight: number = 0, length: number = 0): Promise<string> {
    // Does the user already exists? and if so return an error that says exactly that
    const users = await getUserInfo(undefined, username);
    
    if(users != undefined && users.length > 0){
        console.log("User already exists")
        return "User already exists!";
    }

    // Validate the username and password that you just got
    if(username.length < 4)
        return "Username should be more than to 3 characters long!";

    if(password.length < 8)
        return "Password should be more than 7 characters long!";

    if(password != confirmPassword)
        return "Password and confirm password aren't matching!";

    // Register the user in the database and redirect the client to the login page
    registerUser(username, password);
    return "User registered successfully";
}