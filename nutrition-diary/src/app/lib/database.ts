import sqlite3, { OPEN_CREATE, OPEN_READWRITE } from 'sqlite3';
import { createHash} from 'crypto';
import { database_location } from './config';
import { open, Database } from "sqlite";


export type databaseReturnType = any[] | undefined;

// Function to create db tables if they don't exist
function createDB(){
    // initialize new SQLite database instance using the provided location
    const newDB = new sqlite3.Database(database_location, OPEN_CREATE | OPEN_READWRITE, (err) => {     
        // if error: log the error message
        if (err) {        
            console.error(err.message);     
        }     
    })

    // Serialize db operations to make sure they execute in sequence
    newDB.serialize(() => {
        // Create the tables if they don't exist
        newDB.run(`
            CREATE TABLE IF NOT EXISTS foodNutrients (
                food_name TEXT PRIMARY KEY NOT NULL,
                serving_unit TEXT ,
                serving_qty INTEGER ,
                nix_brand_name TEXT,
                nix_item_name TEXT,
                photo TEXT,
                nix_item_id TEXT,
                upc TEXT,
                nf_calories INTEGER,
                nf_protein REAL,
                nf_fat REAL,
                nf_carbohydrates REAL
            );`);
        newDB.run(`
            CREATE TABLE IF NOT EXISTS foodNutrients (
                food_name TEXT PRIMARY KEY NOT NULL,
                serving_unit TEXT ,
                serving_qty INTEGER ,
                nix_brand_name TEXT,
                nix_item_name TEXT,
                photo TEXT,
                nix_item_id TEXT,
                upc TEXT,
                nf_calories INTEGER,
                nf_protein REAL,
                nf_fat REAL,
                nf_carbohydrates REAL
            );`);
        newDB.run(
            `CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,     
            weight INTEGER NOT NULL,
            height INTEGER NOT NULL
        );`);
        newDB.run(
            `CREATE TABLE IF NOT EXISTS savedMeals(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user INTEGER,
                name TEXT NOT NULL,
                description TEXT NOT NULL,   
                saveTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                calories INTEGER NOT NULL DEFAULT 0,  
                protein REAL NOT NULL, 
                fat REAL NOT NULL,
                carbohydrates REAL NOT NULL,  
                date DATE NOT NULL,         
                FOREIGN KEY (user) REFERENCES users(id)
        );`);
        newDB.run(`
            CREATE TABLE IF NOT EXISTS savedMealItem(
                meal INTEGER,
                food TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                calories INTEGER NOT NULL DEFAULT 0,
                protein NOT NULL DEFAULT 0,
                fat NOT NULL DEFAULT 0,
                carbohydrates NOT NULL DEFAULT 0,
                FOREIGN KEY (meal) REFERENCES savedMeals(id)
            );`);
        
        newDB.run(
            `CREATE TABLE IF NOT EXISTS eatenMeals(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user INTEGER,
                name TEXT NOT NULL,
                date DATETIME NOT NULL, 
                FOREIGN KEY (user) REFERENCES users(username)
            );`);
        newDB.run(
              `CREATE TABLE IF NOT EXISTS eatenMealItem(
                  meal INTEGER,
                  food TEXT NOT NULL,
                  quantity INTEGER NOT NULL,
                  FOREIGN KEY (meal) REFERENCES eatenMeals(name)
            );`);
        newDB.run(`
            CREATE TABLE IF NOT EXISTS tokens(
                token TEXT NOT NULL UNIQUE,
                userID INTEGER,
                valid DATETIME NOT NULL,
                FOREIGN KEY (userID) REFERENCES users(id)
            );`);
        newDB.run(`
            CREATE TABLE IF NOT EXISTS favoriteFoods (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                foodName TEXT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id)
            );`);
        
      });
      
      // Table for User's target goal
      // targettype: how the user wants to track the goal? with daily, weekly or monthly duration?
      // target value: Numeric goal
      newDB.run(`
        CREATE TABLE IF NOT EXISTS targetGoal (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER, 
            calories INTEGER NOT NULL,
            carbohydrates INTEGER NOT NULL,
            protein INTEGER NOT NULL,
            fat INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id)
        );`);

        // Store deleted fav. food
        newDB.run(`
            CREATE TABLE IF NOT EXISTS deletedFavoriteFoods (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                foodName TEXT NOT NULL,
                deletionTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id)
            );`);

        // Table for user's progress
        newDB.run(`
        CREATE TABLE IF NOT EXISTS userProgress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            savedMeals INTEGER,
            mealId INTEGER,
            calories INTEGER NOT NULL DEFAULT 0,
            fat REAL NOT NULL DEFAULT 0,
            carbohydrates REAL NOT NULL DEFAULT 0,
            protein REAL NOT NULL DEFAULT 0,
            date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (savedMeals) REFERENCES savedMeals(userId) ON DELETE CASCADE,
            FOREIGN KEY (mealId) REFERENCES eatenMeals(id)
        );`);

        newDB.run(`
        CREATE TABLE IF NOT EXISTS deletedAccount (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            deletionTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id)
        );`);
};
// Initialize the database and create the tables
createDB();
let db : Database | null = null;

// Function to open the db connection
 async function openDB(){
    if (!db) {
        // If the database instance is not initialized, open the database connection
        db = await open({
        // Specify the database file path
          filename: database_location, 
          // Specify the database driver 
          driver: sqlite3.Database, 
        });
    }
}

/*
export async function openDB(database_location: string): Promise<Database> {
    return open({
        filename: database_location,
        driver: sqlite3.Database,
    });
}
export async function closeDB(db: Database): Promise<void> {
    await db.close();
}
*/

// Function to close the db connection
function closeDB(){
    if(db){
        db.close();
        db = null;
    }
}

// Function to execute to SQL query
async function executeQuery(query : string, params : any, timeout : number = 5000): Promise<any[] | undefined> {
    try{
        await openDB();
        if (db){
            const result = await db.all(query, params);
            closeDB();
            return result;
        }
    }
    catch (error: any){
        console.error(error);
        if (error.message == "SQLITE_BUSY: database is locked" && timeout > 0){
            console.log("Database is locked, retrying in 500ms");
            setTimeout(() => {
                executeQuery(query, params, timeout - 500);
            }, 500);
        }
    }
}

// Function to register the user's eaten meal
export async function registerEatenMeal(user: number, name: string, date: Date){
  await executeQuery(`INSERT INTO eatenMeals(user, name, date) VALUES(?, ?, ?, ?)`, [user, name, date])
}

// Function to register an item of a meal eaten by the user
export async function registerEatenMealItem(meal: number, food: string, quantity: number = 0){
  await executeQuery(`INSERT INTO eatenMealItem(meal, food, quantity) VALUES(?, ?, ?, ?)`, [meal, food, quantity])
}

// Function to view the meals eaten by the user
export async function viewMeals(user: string){
  return executeQuery(`SELECT eatenMeals.name, eatenMeals.id FROM eatenMeals
                       INNER JOIN users ON eatenMeals.user == users.id
                       WHERE username == ?`, [user]);
}

// Function to view the meal items (food items) of the meal eaten by the user
export async function viewFoodsOfMeal(meal: string){
  return executeQuery(`SELECT * FROM eatenMealItem
                       INNER JOIN eatenMeals ON eatenMealItem.meal == eatenMeals.id
                       WHERE meal == ?`, [meal]);
}

// Function to delete a meal
export async function deleteMeal(mealname: string){
  await executeQuery(`DELETE FROM eatenMeals WHERE name == ?`, 
  [mealname])
}

// Function to add a token for the user's authentication
async function deleteOldTokens() {
    await errorHandler(async () => {
        return await executeQuery(`DELETE FROM tokens WHERE valid <= datetime('now')`, []);
    });
}

// Function to delete all tokens associated with the user
async function deleteUserTokens(userId: number) {
    return await executeQuery(`DELETE FROM tokens WHERE userID = ?`, [userId]);
}

// All tokens should be valid for a whole day and then you should need to login again if you haven't
export async function addToken(token: string, userID: number) {
    await errorHandler(async () => {
        await deleteOldTokens();

        return await executeQuery(`INSERT INTO tokens(token, userID, valid) VALUES(?, ?, datetime('now', '+1 day'))`, [token, userID]);
    });
}

// Function to get token data
export async function getTokenData(token: string) {
    return await errorHandler(async () => {
        await deleteOldTokens();
        return await executeQuery(`SELECT userID FROM tokens WHERE token = ?`, [token])
    });
}

// Function to get token from user id
export async function getTokenFromUserID(userID: number) {
    return await errorHandler(async () => {
        await deleteOldTokens();
        return await executeQuery(`SELECT token FROM tokens WHERE userID = ?`, [userID]);
    });
}

// Function to salt hashed password
function generateSalt(): string {
    return Math.random().toString(36).substring(2, 10); 
}

// Function to register a user
export async function registerUser(username: string, password: string, height: number = 0, weight: number = 0){
    return await errorHandler(async () => {
        // const salt = generateSalt();
        password = createHash('sha256').update(password).digest('hex');
        return await executeQuery(`INSERT INTO users(username, password, height, weight) VALUES(?, ?, ?, ?)`, [username, password, height, weight])
    });
}

// Function to update the user's height
export async function updateHeight(userId: number, height: number){
    executeQuery(`UPDATE users SET height = ? WHERE id = ?`, [height, userId]);
}

// Function to update the user's weight
export async function updateWeight(userId: number, weight: number){
    executeQuery(`UPDATE users SET weight = ? WHERE id = ?`, [weight, userId]);
}

// Function to update the user's password
export async function updatePassword(username: string, password: string) {
    await errorHandler(async () => {
        password = createHash('sha256').update(password).digest('hex');
        return await executeQuery(`UPDATE users SET password = ? WHERE username = ?`, [password, username]);
    });
}

// Login function
export async function loginUser(username: string, password: string) {
    const result = await errorHandler(async () => {
        password = createHash('sha256').update(password).digest('hex');
        return await executeQuery(`SELECT id FROM users WHERE username = ? AND password = ?`, [username, password]);
    });

    return result;
}

// Function to get the user's information
export async function getUserInfo(userID: number = -1, username: string = ""){
    return errorHandler(async () => {
        return await executeQuery(`SELECT username, height, weight FROM users WHERE id = ? or username = ?`, [userID, username]);
    });
}

// Save a meal starting with inserting the meal into the savedMeael table
    export async function saveMeal(userId: number, name: string, description: string, calories: number, protein: number, carbohydrates: number, fat:number , items: { food: string, quantity: number }[]): Promise<boolean> {
        let entireDate = new Date().toISOString();
        let date = entireDate.split('T')[0];
        let time = entireDate.split('T')[1].split('.')[0];
        const mealInsertResult = await executeQuery(
            `INSERT INTO savedMeals(user, name, description, calories, protein, carbohydrates, fat, date, saveTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
            [userId, name, description, calories, protein, fat, carbohydrates, date, time]
        );
        // Check if the result isn't empty & then get lastId
        if (mealInsertResult && mealInsertResult.length > 0) {
            const mealId = mealInsertResult[0].id; 
        // Insert the meal into savedMealItem table
        for (const item of items) { // meal items
            await executeQuery(
                `INSERT INTO savedMealItem(meal, food, quantity, calories, protein, fat, carbohydrates) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [mealId, item.food, item.quantity, calories, protein, fat, carbohydrates]
            );
        }
        console.log("Meal saved successfully.");
        return true;
    } else {
        throw new Error("Failed to insert the meal into the database.");
    }
}

// Fetch user's saved meals 
  export async function getSavedMeals(userId: number, date: string, days: number = 1) {
        let d = new Date(date);
        d.setDate(d.getDate() - days);
        return await executeQuery(
            `SELECT id, name, description, date FROM savedMeals WHERE user = ? AND date BETWEEN ? AND ?`,
            [userId, d.toISOString().split('T')[0], date ]
        );
    }

// Fetch mealItems for a saved meal
  export  async function getMealItems(mealId: number) {
        return await executeQuery(
            `SELECT * FROM savedMealItem WHERE meal = ?`,
            [mealId]
        );
    }
    
    export async function testMealItems() {
        let res =  await executeQuery(
            `SELECT * FROM savedMeals`,
            []
        );
        console.log(res);
    }

// Add user's fav. food
    export async function addFavoriteFood(userId: number, foodName: string) {
        return await executeQuery(
            `INSERT INTO favoriteFoods (userId, foodName) VALUES (?, ?)`, 
            [userId, foodName]
        );
}

// Fetch user's fav. food to display
    export async function getFavoriteFood(userId: number) {
        return await executeQuery(`SELECT foodName FROM favoriteFoods WHERE userId = ?`, [userId]);
    }

// Remove user's fav. food
    export async function removeFavoriteFood(userId: number, foodName: string) {
        return await executeQuery(
            `DELETE FROM favoriteFoods WHERE userId = ? AND foodName = ?`, 
            [userId, foodName]);
}
// Remove user's fav. food list
    export async function deleteFavFoods(userId: number) { 
        // open the db connection asynchronously, if database connection is successfull
        try { 
            await openDB(); 
            if (db) { 
            // delete all rows from fav.Foods table, of the selected userId 
            await db.run(
                `DELETE FROM favoriteFoods WHERE userId = ?`,
                [userId]); 
                // delete the user's account and date
            await db.run(
                `DELETE FROM users WHERE id=?`,
                [userId]
            );
            // log the deletion time and user's id in the deleteAccount table
            await db.run(
                `INSERT INTO deleteAccount (userId) VALUES (?)`,
                [userId]
            );

                // logging message to the console to indicate that all fav.foods are deleted from db
                console.log("All fav. foods are cleared."); 
            } 
        } catch (error) { 
            console.error("Error deleting favorite foods:", error); 
        } finally{
            closeDB();
        }
    }

// Add user's deleted fav. foods into db
    export async function addDeletedFavoriteFood(userId: number, foodName: string) {
        return await executeQuery(
            `INSERT INTO deletedFavoriteFoods (userId, foodName) VALUES (?, ?)`, 
            [userId, foodName]
        );
    }  

// Retrive user's deleted fav. foods within the past day
    export async function getDeletedFavoriteFood(userId: number){
        const oneDay = new Date();  
        oneDay.setDate(oneDay.getDate()-1);
        return await executeQuery(
            `SELECT foodName FROM deletedFavoriteFoods WHERE userId = ? AND deletionTime >=?`,
            [userId, oneDay.toISOString()] // toLocaleString
        );
    }

// Retrieve user's progress interval
    export async function getUserProgress(userId:number, datetime: string){
        let startProgInterval, endProgInterval;
        // Determine start-&end-time of a specific interval
        switch (datetime){
            case 'Today':
            // start- and end-Date are set to the current date 
                startProgInterval  = new Date().toISOString().split('T')[0];
                endProgInterval    = startProgInterval;
                break;
            case 'Weekly':
            // start-Date is set 7 days past the current date, while end-Date is set today
                const startOfWeek = new Date();
                // start of the current week
                startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
                startProgInterval  = new Date();
                startProgInterval.setDate(startProgInterval.getDate()-7);
                endProgInterval    = new Date().toISOString().split('T')[0];
                break;
            case 'Monthly':
                const startOfMonth = new Date();
                startOfMonth.setDate(1);
                startProgInterval  = new Date();
                startProgInterval.setMonth(startProgInterval.getMonth()-1);
                endProgInterval    = new Date().toISOString().split('T')[0];
                break;
            default:
                throw new Error(' Unknown time interval')
        }

        // query to sum the nutrients within a specific time intervall
        const progressData = await executeQuery(
            `SELECT 
                SUM(calories) AS totalCalories,
                SUM(fat) AS totalFat,
                SUM(carbohydrates) AS totalCarbohydrates,
                SUM(protein) AS totalProtein
            FROM userProgress
            WHERE userId = ? AND date BETWEEN ? AND ?`,
            [userId, startProgInterval, endProgInterval]
        );
        /*
        // query to retrieve data for a specific time 
        const progressData = await executeQuery(
            `SELECT * FROM user_progress
             WHERE user_id = ? AND date BETWEEN ? AND ?`,
            [userId, startProgInterval, endProgInterval]
        );
        
        */
       // return the aggregated nutrients value        
        return progressData;

    }

// Set user's target value for a specific time slope
    export async function setTargetGoal(userId: number, calories:number, carbohydrates: number, protein: number, fat:number){
        return await executeQuery(
            `INSERT INTO targetGoal (userId, calories, carbohydrates, protein, fat) VALUES (?, ?, ?, ?, ?)`,
            [userId, calories, carbohydrates, protein, fat]
        );
    }

// Get user's target value for a specific time slope
export async function getTargetGoal(userId: number){
    return await executeQuery(
            `SELECT calories, carbohydrates, protein, fat FROM targetGoal WHERE userId=?`,
            [userId]
        );
    }

// Update user's target goal
    export async function updateTargetGoal(userId: number, calories:number, carbohydrates: number, protein: number, fat:number) {
        return await executeQuery(
            `UPDATE targetGoal SET calories = ?, carbohydrates = ?, protein = ?, fat = ? WHERE userId = ?`,
            [calories, carbohydrates, protein, fat, userId]
        );
    }

// Store user's progress in db
    export async function storeUserProgress(userId:number, calories: number, fat: number, carbohydrates: number, protein: number) {
    // get current timestamp in ISO string fromate (YYYY-MM-DDTHH:MM:SS.sssZ)
        const currentTimestamp = new Date().toISOString();
        // execute the db query to insert user's progress
        await executeQuery(
            `   INSERT INTO userProgress (userId, mealId, date, calories, fat, carbohydrates, protein) VALUES (?,?,?,?,?,?,?)`,
            [userId, calories, fat, carbohydrates, protein, currentTimestamp]
        )
    }


    // Retrieve user progress with meal details
    export async function getUserProgressWithMeals(userId: number) {
        try {
            // Open the database connection
            await openDB();

            // Check if db is null
            if (!db) {
                throw new Error("Database connection is not established.");
            }

            // Execute the query to retrieve progress along with meal details
            const progressWithMeals = await db.all(
                `SELECT userProgress.*, eatenMeals.name AS mealName
                FROM userProgress
                INNER JOIN eatenMeals ON userProgress.mealId = eatenMeals.id
                WHERE userProgress.userId = ?`,
                [userId]
            );

            // Close the database connection
            closeDB();

            // Return the retrieved progress with meal details
            return progressWithMeals;
        } catch (error) {
            // Handle errors
            console.error("Error retrieving user progress with meals:", error);
            return undefined;
        }
    }

// Function to retrieve user progress with nutrient consumption for a specified time interval
    export async function getUserProgressWithNutrients(userId: number, interval: string) {
        // Determine the start and end dates of the specified interval
        let startDateSlope, endDateSlope;
        // calculate startDateSlope and endDateSlope based on the interval
        const currentTimestamp = new Date();
        switch (interval.toLowerCase()) {
            case 'today':
                startDateSlope = new Date(currentTimestamp);
                endDateSlope = new Date(currentTimestamp);
                break;
            case 'weekly':
                startDateSlope = new Date(currentTimestamp);
                startDateSlope.setDate(startDateSlope.getDate() - 7); // Set startDate to 7 days ago
                endDateSlope = new Date(currentTimestamp);
                break;
            case 'monthly':
                startDateSlope = new Date(currentTimestamp);
                startDateSlope.setMonth(startDateSlope.getMonth() - 1); // Set startDate to 1 month ago
                endDateSlope = new Date(currentTimestamp);
                break;
            default:
                throw new Error('Invalid interval type');
        }


        // Query to retrieve user progress along with sum of consumed nutrients for the interval
        const progressWithNutrients = await executeQuery(
            `SELECT userProgress.date, SUM(eatenMealItem.calories) AS totalCalories,
                    SUM(eatenMealItem.protein) AS totalProtein,
                    SUM(eatenMealItem.fat) AS totalFat,
                    SUM(eatenMealItem.carbohydrates) AS totalCarbohydrates
            FROM userProgress
            LEFT JOIN eatenMeals ON userProgress.mealId = eatenMeals.id
            LEFT JOIN eatenMealItem ON eatenMeals.id = eatenMealItem.meal
            WHERE userProgress.userId = ? AND userProgress.date BETWEEN ? AND ?
            GROUP BY userProgress.date`,
            [userId, startDateSlope, endDateSlope]
        );

        // Return the retrieved progress with nutrient consumption
        return progressWithNutrients;
    }



 

// Delete user's progress
    async function deleteProgress(userId:number) {
        return await executeQuery(
            `DELETE FROM userProgress WHERE userId=?`,
            [userId]
        );
    }
// Delete user's fav. meals
    async function deleteFavoriteMeals(userId: number) {
        return await executeQuery(`DELETE FROM favoriteFoods WHERE userId = ?`, [userId]);
    }
    export async function deleteUserFavoriteFoods(userId: number) {
        return await executeQuery(`DELETE FROM favoriteFoods WHERE userId = ?`, [userId]);
    }
// Delete user's meals
    async function deleteUserEatenMeals(userId: number) {
        await executeQuery(`DELETE FROM eatenMeals WHERE user = ?`, 
        [userId]);
        await executeQuery(`DELETE FROM eatenMealItem WHERE 
        meal IN (SELECT id FROM eatenMeals WHERE user = ?)`, 
        [userId]);
    }
// Delete user's saved meals
    async function deleteUserSavedMeals(userId: number) {
        await executeQuery(`DELETE FROM savedMeals WHERE user = ?`, [userId]);
        await executeQuery(`DELETE FROM savedMealItem WHERE meal IN (SELECT id FROM savedMeals WHERE user = ?)`, [userId]);
    }
    export async function deleteSavedMeals(userId: number) {
        // First, delete meal items associated with each saved meal
        await executeQuery(`DELETE FROM savedMealItem WHERE meal IN (SELECT id FROM savedMeals WHERE user = ?)`, [userId]);
        // Then, delete the saved meals themselves
        await executeQuery(`DELETE FROM savedMeals WHERE user = ?`, [userId]);
    }


// Delete user's account along with all the associated data
    export async function deleteAccount(userId:number){
        try{
            // delete the tokens associated with the user
            await deleteUserTokens(userId);

            // delete user's progress
            await deleteProgress(userId);

            // delete user's fav. meals
            await deleteFavoriteMeals(userId);
            await deleteUserFavoriteFoods(userId);
            
            // delete user's meals
            await deleteUserEatenMeals(userId);

            // delete user's saved meals
            await deleteUserSavedMeals(userId);
            await deleteSavedMeals(userId);

            // delete saved nutrients... (Not completed)

            // delete user's account 
            await executeQuery(`DELETE FROM users WHERE id=?`, 
            [userId]);

            // log message for the successfull deletion
            console.log(`Account deleted successfully`);
            return true;
        } catch(error){
            console.error("Error occurred, failed deleting the account", error);
            return false;
        }
    }

// Function to handle errors in async db operations
type errorHandlerFunction = () => Promise<databaseReturnType | undefined>;
// the function is executed for errors
async function errorHandler(fn: errorHandlerFunction): Promise<databaseReturnType | undefined> {
    try {
    // execute function and return it's resutls
        return await fn();
    }
    catch(e) {
    // log error to the console and then return undefined in case of error..
        console.log(e); // Alternatively, use console.e("Error:", e); ?
        return undefined;
    }
}


// Save food data in db
export async function saveFoodData(foodName: string, servingUnit: string, servingQty: number, nixBrandName: string | null | undefined, nixItemName: string | null | undefined, photoThumb: string, nixItemId: string | null | undefined, upc: string | null | undefined, calories: number, protein: number, fat: number, carbohydrates: number) {
    await executeQuery(
        `INSERT INTO foodNutrients(food_name, serving_unit, serving_qty, nix_brand_name, nix_item_name, photo, nix_item_id, upc, nf_calories, nf_protein, nf_fat, nf_carbohydrates) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);`,
        [foodName, servingUnit, servingQty, nixBrandName, nixItemName, photoThumb, nixItemId, upc, calories, protein, fat, carbohydrates]);
    //testInsert();
}


// Get food data from db
export async function getFoodData(foodName: string) {
    let res = await executeQuery(
        `SELECT * FROM foodNutrients WHERE food_name = ?;`,
        [foodName]);
    return res;
}

export async function deleteFoodData() {
    await executeQuery(
        `DELETE FROM foodNutrients WHERE 1=1;`,
        []);
}

function getStartDate(interval: string): string {
    const today = new Date();
  
    if (interval === 'today') {
      return today.toISOString().split('T')[0];
    } else if (interval === 'weekly') {
      const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); 
      return firstDayOfWeek.toISOString().split('T')[0];
    } else if (interval === 'monthly') {
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return firstDayOfMonth.toISOString().split('T')[0];
    } else {
      throw new Error('Invalid interval. Must be "today", "weekly", or "monthly".');
    }
  }
  
  export async function fetchgetUserProgress(userId: number, interval: string) {
    const startDate = getStartDate(interval);
  
    const query = `
      SELECT calories, protein, fat, carbohydrates, date 
      FROM savedMeals WHERE user = ? AND date >= ? ORDER BY date`;
  
    const result = await executeQuery(query, [userId, startDate]);
    return result;
  }
  
  export async function getAllItems() {
    let res = await executeQuery(
        `SELECT * FROM savedMealItem;`,
        []);
    return res;
}