"use server";

import { redirect } from "next/navigation";
import { SearchFoodItemNutrientsData, SearchListFoodItemData } from "../lib/definitions";
import { databaseReturnType, getTokenData, getUserInfo, loginUser, registerUser } from "../lib/database";
import { cookies } from "next/headers";
import { createSession, deleteSession } from "../lib/session";
import { getProgInterval } from "../lib/database";

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

export async function fetchUserProgress(userId: number, interval: string) {
    try {
     
        const results = await getProgInterval(userId, interval);
        if (!results) {
            console.error('No data returned from getProgInterval');
            return [];  // Handle the case where results might be undefined
        }
        const formattedData = results.map((item, index) => ({
            day: `Day ${index + 1}`,
            calories: item.calories,
            carbohydrates: item.carbohydrates,
            protein: item.protein,
            fat: item.fat
        }));

       
        return formattedData;
    } catch (error) {
        console.error('Error fetching weekly progress:', error);
        return []; // Return an empty array in case of an error
    }
}



// WIP!!!
// gives a list of meals with the calories
// export async function GetMealList(username: string, )