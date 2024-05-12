"use server";

import { SavedFoodData, SearchFoodItemNutrientsData, SearchListFoodItemBranded, SearchListFoodItemCommon, SearchListFoodItemData } from "../lib/definitions";
import { getFoodData, saveFoodData, saveMeal } from "../lib/database";
import { GetUserID } from "./users";
import { cookies } from "next/headers";
import { decrypt, verifySession } from "../lib/session";
import { verify } from "crypto";

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

export async function SearchForBrandedFood(nix_item_id: string): Promise<string | undefined> {
    const id = process.env.X_APP_ID;
    const key = process.env.X_APP_KEY;

    if(id == undefined || key == undefined) {
        return undefined;
    }
    else {
        // URL
        const url: string = "https://trackapi.nutritionix.com/v2/search/item/?nix_item_id="+nix_item_id;

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

export async function handleCommonResult(results: SearchListFoodItemCommon[], nutrientData: SavedFoodData[], secondTry: boolean = false){
    for(const result of results){ 
        let nutrients = await getFoodData(result.food_name);
        if (nutrients != undefined && nutrients.length > 0) {
            nutrientData.push(nutrients[0] as SavedFoodData);
        }
        else {
            console.log("Failed to find " + result.food_name +" in database")
            let res = await SearchForFood(result.food_name)
            if (res != undefined ) {
                const data_list = JSON.parse(res);
                const data = data_list.foods[0];
                let p = data.photo;
                let t = "";
                if(p != undefined){t = p.thumb;}
                await saveFoodData(result.food_name, data.serving_unit, data.serving_qty, data.nix_brand_name, data.nix_item_name, t, data.nix_item_id, data.upc, data.nf_calories, data.nf_protein, data.nf_total_fat, data.nf_total_carbohydrate);
                if (!secondTry) {await handleCommonResult(results, nutrientData, true); }
            }
        }
    }
    return nutrientData;
}

export async function handleBrandedResult(results: SearchListFoodItemBranded[], nutrientData: SavedFoodData[], secondTry: boolean = false){
    for (const result of results) {
        let nutrients = await getFoodData(result.food_name)
        if (nutrients != undefined && nutrients.length > 0) {
            nutrientData.push(nutrients[0]);
        }
        else {
            console.log("Failed to find " + result.food_name +" in database")
            if(result.nix_item_id != undefined){
                let res = await SearchForBrandedFood(result.nix_item_id)
                if (res != undefined) {
                    const data_list = JSON.parse(res);
                    const data = data_list.foods[0];
                    let p = data.photo;
                    let t = "";
                    if(p != undefined){t = p.thumb;}
                    saveFoodData(result.food_name, data.serving_unit, data.serving_qty, data.nix_brand_name, data.nix_item_name, t, data.nix_item_id, data.upc, data.nf_calories, data.nf_protein, data.nf_total_fat, data.nf_total_carbohydrate);
                    if (!secondTry) {await handleBrandedResult(results, nutrientData, true); }
                }
            }
            else{
                let res = await SearchForFood(result.food_name)
                if (res != undefined) {
                    const data_list = JSON.parse(res);
                    const data = data_list.foods[0];
                    let p = data.photo;
                    let t = "";
                    if(p != undefined){t = p.thumb;}
                    await saveFoodData(result.food_name, data.serving_unit, data.serving_qty, data.nix_brand_name, data.nix_item_name, t, data.nix_item_id, data.upc, data.nf_calories, data.nf_protein, data.nf_total_fat, data.nf_total_carbohydrate);
                    if (!secondTry) {await handleBrandedResult(results, nutrientData, true); }
                }
            }
        }
    }
    return nutrientData;
}

export async function saveMealAction(mealName: string, description: string, totalCalories: number, totalProtein: number, totalCarbohydrates: number, totalFat: number, items: {food: string, quantity: number}[]) {
    const session = await verifySession();
    if(session.isAuth == false ) return;
    const userId: number = session.userId as number;
    saveMeal(userId, mealName, "No description", totalCalories, totalProtein, totalCarbohydrates, totalFat, items);
    
}
// WIP!!!
// gives a list of meals with the calories
// export async function GetMealList(username: string, )