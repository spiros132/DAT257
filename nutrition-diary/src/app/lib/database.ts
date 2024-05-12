
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
    });

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
                FOREIGN KEY (user) REFERENCES users(username)
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
                FOREIGN KEY (meal) REFERENCES savedMeals(name)
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

      newDB.run(`
        CREATE TABLE IF NOT EXISTS targetGoal (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            targetType TEXT NOT NULL, 
            targetValue REAL NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id)
        );`);
        // targettype: how the user wants to track the goal? with daily, weekly or monthly duration?
        // target value is the numeric goal

        // store deleted fav. food
        newDB.run(`
            CREATE TABLE IF NOT EXISTS deletedFavoriteFoods (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                foodName TEXT NOT NULL,
                deletionTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id)
            );`);

        // 
        newDB.run(`
        CREATE TABLE IF NOT EXISTS userProgress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            progressValue INTEGER,
            date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
        );`);

        newDB.run(`
        CREATE TABLE IF NOT EXISTS deletedAccount (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            deletionTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id)
        );
        `);
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
  return executeQuery(`SELECT eatenMeals.name FROM eatenMeals
                       INNER JOIN users ON eatenMeals.user == users.id
                       WHERE username == ?`, [user]);
}

// Function to view the meal items (food items) of the meal eaten by the user
export async function viewFoodsOfMeal(meal: string){
  return executeQuery(`SELECT eatenMealItem.name FROM eatenMealItem
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
export async function updateHeight(username: string, height: number){
    executeQuery(`UPDATE users SET height = ? WHERE username = ?`, [height, username]);
}

// Function to update the user's weight
export async function updateWeight(username: string, weight: number){
    executeQuery(`UPDATE users SET weight = ? WHERE username = ?`, [weight, username]);
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
    export async function saveMeal(userId: number, name: string, description: string, calories: number, protein: number, carbohydrates: number, fat:number , items: { food: string, quantity: number }[]) {
        const mealInsertResult = await executeQuery(
            `INSERT INTO savedMeals(user, name, description, calories, protein, carbohydrates, fat ) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id`,
            [userId, name, description, calories, protein, fat, carbohydrates]
        );
        // Check if the result isn't empty & then get lastId
        if (mealInsertResult && mealInsertResult.length > 0) {
            const mealId = mealInsertResult[0].lastID; 
        // Insert the meal into savedMealItem table
        for (const item of items) { // meal items
            await executeQuery(
                `INSERT INTO savedMealItem(meal, food, quantity, calories, protein, fat, carbohydrates) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [mealId, item.food, item.quantity, calories, protein, fat, carbohydrates]
            );
        }
        console.log("Meal saved successfully.");
    } else {
        throw new Error("Failed to insert the meal into the database.");
    }

// Fetch user's saved meals 
    async  function getSavedMeals(userId: number) {
        return executeQuery(
            `SELECT id, name, description FROM savedMeals WHERE user = ?`,
            [userId]
        );
    }

// Fetch mealItems for a saved meal
    async function getMealItems(mealId: number) {
        return executeQuery(
            `SELECT food, quantity FROM savedMealItem WHERE meal = ?`,
            [mealId]
        );
    }}

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
                startProgInterval  = new Date();
                endProgInterval    = new Date();
                break;
            case 'Weekly':
            // start-Date is set 7 days past the current date, while end-Date is set today
                startProgInterval  = new Date();
                startProgInterval.setDate(startProgInterval.getDate()-7);
                endProgInterval    = new Date();
                break;
            case 'Monthly':
                startProgInterval  = new Date();
                startProgInterval.setMonth(startProgInterval.getMonth()-1);
                endProgInterval    = new Date();
                break;
            default:
                throw new Error(' Unknown time interval')
        }
        // query to retrieve data for a specific time 
        const progressData = await executeQuery(
            `SELECT * FROM user_progress
             WHERE user_id = ? AND date BETWEEN ? AND ?`,
            [userId, startProgInterval, endProgInterval]
        );
        return progressData;

    }

// Set user's target value for a specific time slope
    export async function setTargetGoal(userId: number, targetType: string, targetValue: number){
        return await executeQuery(
            `INSERT INTO targetGoal (userId, targetType, targetValue) VALUES (?, ?, ?)`,
            [userId, targetType, targetValue]
        );
    }

// Get user's target value for a specific time slope
    export async function getTargetGoal(userId: number, targetType: string, targetValue: number){
        return await executeQuery(
            `SELECT targetValue FROM targetGoal WHERE userId=? AND targetType=?`,
            [userId, targetType]
        );
    }

// Update user's target goal
    export async function updateTargetGoal(userId: number, targetType: string, targetValue: number) {
        return await executeQuery(
            `UPDATE targetGoal SET targetValue = ? WHERE userId = ? AND targetType = ?`,
            [targetValue, userId, targetType]
        );
    }

// Store user's progress in db
    export async function storeUserProgress(userId:number, progressValue: number) {
    // get current timestamp in ISO string fromate (YYYY-MM-DDTHH:MM:SS.sssZ)
        const CURRENT_TIMESTAMP = new Date().toISOString();
        // execute the db query to insert user's progress
        await executeQuery(
            `   INSERT INTO userProgress (userId, progressValue, date) VALUES (?,?,?)`,
            [userId, progressValue, CURRENT_TIMESTAMP]
        )
    }


// Retrieve user's progress intervall
    export async function getProgInterval(userId: number, interval: string) {
        let startDateSlope, endDateSlope;
        // Select the date range for the specified interval
        switch (interval) {
            case 'today':
            // For today's interval, both start- and end- dates are set to today
                startDateSlope = new Date().toISOString().split('T')[0];
                endDateSlope = startDateSlope;
                break;
            case 'this_week':
            // For the week's intervall, the start- and end-dates are calculated based on the current day
                startDateSlope = new Date();
                startDateSlope.setDate(startDateSlope.getDate() - startDateSlope.getDay()); // ex. start on sunday
                endDateSlope = new Date();
                endDateSlope.setDate(endDateSlope.getDate() + (6 - endDateSlope.getDay())); // end on saturday
                // Convert dates to ISO string format (YYYY-MM-DD)
                startDateSlope = startDateSlope.toISOString().split('T')[0];
                endDateSlope = endDateSlope.toISOString().split('T')[0];
                break;
            case 'this_month':
            // For the month's interval, the star- & end-date are set based on the last day of the current month
                startDateSlope = new Date();
                startDateSlope.setDate(1); // Start of the month
                endDateSlope = new Date();
                endDateSlope.setMonth(endDateSlope.getMonth() + 1); // End of the month, move to next month
                endDateSlope.setDate(0); // Last day of the previous month
                // convert the date to an ISO 8601 string formate (YYY-MM-DD)
                startDateSlope = startDateSlope.toISOString().split('T')[0];
                endDateSlope = endDateSlope.toISOString().split('T')[0];
                break;
            default:
            // In case of invalid interval types: 
                throw new Error('Invalid interval type');
        }
    
        // Query to retrieve progress of a specified interval
        return await executeQuery(
            `SELECT * FROM user_progress WHERE user_id = ? AND date BETWEEN ? AND ?`,
            [userId, startDateSlope, endDateSlope]
        );
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
    foodName = foodName[0].toUpperCase  + foodName.slice(1).toLowerCase();
    await executeQuery(
        `INSERT INTO foodNutrients(food_name, serving_unit, serving_qty, nix_brand_name, nix_item_name, photo, nix_item_id, upc, nf_calories, nf_protein, nf_fat, nf_carbohydrates) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);`,
        [foodName, servingUnit, servingQty, nixBrandName, nixItemName, photoThumb, nixItemId, upc, calories, protein, fat, carbohydrates]);
    //testInsert();
}

async function testInsert(){
    let res = await executeQuery(`SELECT * FROM foodNutrients;`, []);
    console.log(res);
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