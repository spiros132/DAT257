"use server";

export default async function SearchForFood(foodsearch: string): Promise<any | undefined> {
    const id = process.env.X_APP_ID;
    const key = process.env.X_APP_KEY;

    if(id == undefined || key == undefined) {
        return undefined;
    }
    else {
        const myHeaders = new Headers();
        myHeaders.append("x-app-id", id);
        myHeaders.append("x-app-key", key);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
        const urlencoded = new URLSearchParams();
        urlencoded.append("query", foodsearch);
    
        // Request options needed
        const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
        };
    
        const res = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", requestOptions);

        // Return the json of the response body
        return await res.json();
    }
}