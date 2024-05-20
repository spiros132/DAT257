"use server";

import { getAllItems, getMealItems, getSavedMeals, testMealItems} from "../lib/database";
import { fetchgetUserProgress } from "../lib/database";
import { SavedFoodData, SearchFoodItemNutrientsData, SearchListFoodItemBranded, SearchListFoodItemCommon, SearchListFoodItemData } from "../lib/definitions";
import { getFoodData, saveFoodData, saveMeal } from "../lib/database";
import { verifySession } from "../lib/session";
import { redirect } from 'next/navigation'
import { setTargetGoal } from "../lib/database";
import { getTargetGoal } from "../lib/database";
import { updateTargetGoal } from "../lib/database";
import { getUserInfo } from "../lib/database";

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
                if(data == undefined){continue;}
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

export async function getUserStuff(){
    return getUserInfo(Number(getUserId()))
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

export async function testMealDB() {
    testMealItems();
}

export async function saveMealAction(mealName: string, description: string, totalCalories: number, totalProtein: number, totalCarbohydrates: number, totalFat: number, items: {food: string, quantity: number}[]) {
    const session = await verifySession();
    if(session.isAuth == false ) return;
    const userId: number = session.userId as number;
    if(description == "" || description == undefined) description = "No description";
    let res = await saveMeal(userId, mealName, description, totalCalories, totalProtein, totalCarbohydrates, totalFat, items);
    if(res) redirect('/dashboard');
}

export async function getUserId() {
    const session = await verifySession();
    if (typeof session.userId === 'number') {
        const userId = session.userId;
        return userId;
    }
    return null;
}

export async function getCalorieCounterInfo() {
    let calories = 0;
    let carbs = 0;
    let protein = 0;
    let fat = 0;

    let userId = await getUserId();

    if (userId != null) {
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

        const meals = await getSavedMeals(userId, currentDate);

        if(meals){
            for (const meal of meals) {
                const foodItems = await getMealItems(meal.id);
                if(foodItems){
                    for (const item of foodItems) {
                        calories += item.calories;
                        carbs += item.carbohydrates;
                        protein += item.protein;
                        fat += item.fat;
                    }                    
                }

            }
        }

    }

    return {calories, carbs, protein, fat};
}

export async function getEatenMeals(days: number = 1): Promise<{calories:number,carbs:number,protein:number,fat:number, name:string, date:string}[]> {
    let userId = await getUserId();
    let data: {calories:number,carbs:number,protein:number,fat:number, name:string, date:string}[] = [];
    if (userId != null) {
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        const meals = await getSavedMeals(userId, currentDate, days);
        if(meals){
            for (const meal of meals) {
                let mealNutrient: {calories:number,carbs:number,protein:number,fat:number, name:string, date:string};
                let calories = 0;
                let carbs = 0;
                let protein = 0;
                let fat = 0;

                const foodItems = await getMealItems(meal.id);
                if(foodItems){
                    if(foodItems){
                        for (const item of foodItems) {
                            calories += item.calories;
                            carbs += item.carbohydrates;
                            protein += item.protein;
                            fat += item.fat;
                        }                    
                    }                    
                }
                mealNutrient = {calories, carbs, protein, fat, name: meal.name, date: meal.date};
                data.push(mealNutrient);
            }
        }
    }
    return data;
    
}

export async function fetchUserProgress(userId: number, interval: string) {
    try {
      const results = await fetchgetUserProgress(userId, interval);
      if (!results) {
        console.error('No data returned from fetchgetUserProgress');
        return [];
      }
  
      const aggregatedData: { [date: string]: { calories: number; carbohydrates: number; protein: number; fat: number; date: string } } = {};
  
      results.forEach((item: any) => {
        const date = item.date;
        if (!aggregatedData[date]) {
          aggregatedData[date] = {
            calories: 0,
            carbohydrates: 0,
            protein: 0,
            fat: 0,
            date: date
          };
        }
        aggregatedData[date].calories += item.calories;
        aggregatedData[date].carbohydrates += item.carbohydrates;
        aggregatedData[date].protein += item.protein;
        aggregatedData[date].fat += item.fat;
      });
  
      const formattedData = Object.values(aggregatedData).map(item => ({
        calories: Math.round(item.calories),
        carbohydrates: Math.round(item.carbohydrates),
        protein: Math.round(item.protein),
        fat: Math.round(item.fat),
        date: item.date
      }));
  
      return formattedData;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      return []; // Return an empty array in case of an error
    }
  }
  
export async function addTarget(userId: number, calories:number, carbohydrates: number, protein: number, fat:number){

    await setTargetGoal(userId, calories, carbohydrates, protein, fat);
}

export async function fetchTargetGoal() {
        const userId = await getUserId();
        if(userId){
            try {
                const result = await getTargetGoal(userId);
                if (!result || result.length === 0) {
                    console.log(result);
                    console.error('No data returned from fetchTargetGoal');
                    return {
                        calories: 0,
                        carbs: 0,
                        protein: 0,
                        fat: 0
                    };
                }
                const { calories, carbohydrates, protein, fat } = result[0];
                return {
                    calories: Math.round(calories),
                    carbs: Math.round(carbohydrates),
                    protein: Math.round(protein),
                    fat: Math.round(fat)
                };
            } catch (error) {
                console.error('Error fetching target goal:', error);
                return {
                    calories: 0,
                    carbs: 0,
                    protein: 0,
                    fat: 0
                };
            }               
        }
        return {
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0
        };
     


}



export async function updateTarget(userId: number, calories:number, carbohydrates: number, protein: number, fat:number) {
    await updateTargetGoal(userId, calories, carbohydrates, protein, fat);
}



// WIP!!!
// gives a list of meals with the calories
// export async function GetMealList(username: string, )