"use server";

export async function SearchForFood(foodname: string): Promise<any> {
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

        // Return the json of the response body
        return await res.json();
    }
}

export async function SearchForFoodList(foodname: string): Promise<any> {
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

        // Return the json of the response body
        return await res.json();
    }
}