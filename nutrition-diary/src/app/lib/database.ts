
import sqlite3, { OPEN_CREATE, OPEN_READWRITE } from 'sqlite3';
import { createHash} from 'crypto';
import { database_location } from './config';
import { open, Database } from "sqlite";
import { createHash } from 'crypto';

export type databaseReturnType = any[] | undefined;

function createDB(){
    const newDB = new sqlite3.Database(database_location, OPEN_CREATE | OPEN_READWRITE, (err) => {     
        if (err) {        
            console.error(err.message);     
        }     
    });

    newDB.serialize(() => {
        newDB.run(
            `CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL, 
            weight INTEGER NOT NULL,
            height INTEGER NOT NULL
        )`);
        newDB.run(
            `CREATE TABLE IF NOT EXISTS savedMeals(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user INTEGER,
                name TEXT NOT NULL,
                description TEXT NOT NULL,   
                calories INTEGER NOT NULL DEFAULT 0,  
                protein REAL NOT NULL, 
                fat REAL NOT NULL,
                carbohydrates REAL NOT NULL,           
                FOREIGN KEY (user) REFERENCES users(username)
        )`);
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
            )`);
        
        newDB.run(
            `CREATE TABLE IF NOT EXISTS eatenMeals(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user INTEGER,
                name TEXT NOT NULL,
                date DATETIME NOT NULL, 
                FOREIGN KEY (user) REFERENCES users(username)
            )`);
        newDB.run(
              `CREATE TABLE IF NOT EXISTS eatenMealItem(
                  meal INTEGER,
                  food TEXT NOT NULL,
                  quantity INTEGER NOT NULL,
                  FOREIGN KEY (meal) REFERENCES eatenMeals(name)
            )`);
        newDB.run(`
            CREATE TABLE IF NOT EXISTS tokens(
                token TEXT NOT NULL UNIQUE,
                userID INTEGER,
                valid DATETIME NOT NULL,
                FOREIGN KEY (userID) REFERENCES users(id)
            )`);
        newDB.run(`
            CREATE TABLE IF NOT EXISTS favoriteFoods (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                userId INTEGER,
                foodName TEXT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id)
            )`);
      });

      newDB.run(`
        CREATE TABLE IF NOT EXISTS targetGoal (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            targetType TEXT NOT NULL, 
            targetValue REAL NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id)
        )`);
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
            )`);

        // 
        newDB.run(`
        CREATE TABLE IF NOT EXISTS userProgress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            progressValue INTEGER,
            date DATETIME NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id)
        `);
};

createDB();
let db : Database | null = null;

async function openDB(){
    if (!db) {
        // If the database instance is not initialized, open the database connection
        db = await open({
          filename: database_location, // Specify the database file path
          driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
        });
    }
}

function closeDB(){
    if(db){
        db.close();
        db = null;
    }
}

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

export async function registerEatenMeal(user: number, name: string, date: Date){
  await executeQuery(`INSERT INTO eatenMeals(user, name, date) VALUES(?, ?, ?, ?)`, [user, name, date])
}

export async function registerEatenMealItem(meal: number, food: string, quantity: number = 0){
  await executeQuery(`INSERT INTO eatenMealItem(meal, food, quantity) VALUES(?, ?, ?, ?)`, [meal, food, quantity])
}

export async function viewMeals(user: string){
  return executeQuery(`SELECT eatenMeals.name FROM eatenMeals
                       INNER JOIN users ON eatenMeals.user == users.id
                       WHERE username == ?`, [user]);
}

export async function viewFoodsOfMeal(meal: string){
  return executeQuery(`SELECT eatenMealItem.name FROM eatenMealItem
                       INNER JOIN eatenMeals ON eatenMealItem.meal == eatenMeals.id
                       WHERE meal == ?`, [meal]);
}

export async function deleteMeal(mealname: string){
  await executeQuery(`DELETE FROM eatenMeals WHERE name == ?`, 
  [mealname])
}

async function deleteOldTokens() {
    await errorHandler(async () => {
        return await executeQuery(`DELETE FROM tokens WHERE valid <= datetime('now')`, []);
    });
}

// All tokens should be valid for a whole day and then you should need to login again if you haven't
export async function addToken(token: string, userID: number) {
    await errorHandler(async () => {
        await deleteOldTokens();

        return await executeQuery(`INSERT INTO tokens(token, userID, valid) VALUES(?, ?, datetime('now', '+1 day'))`, [token, userID]);
    });
}

export async function getTokenData(token: string) {
    return await errorHandler(async () => {
        await deleteOldTokens();
        return await executeQuery(`SELECT userID FROM tokens WHERE token = ?`, [token])
    });
}

export async function getTokenFromUserID(userID: number) {
    return await errorHandler(async () => {
        await deleteOldTokens();
        return await executeQuery(`SELECT token FROM tokens WHERE userID = ?`, [userID]);
    });
}

function generateSalt(): string {
    return Math.random().toString(36).substring(2, 10); 
}

export async function registerUser(username: string, password: string, height: number = 0, weight: number = 0){
    return await errorHandler(async () => {
        const salt = generateSalt();
        const hashedPassword = createHash('sha256').update(password + salt).digest('hex');
        return await executeQuery(`INSERT INTO users(username, password, height, weight) VALUES(?, ?, ?, ?)`, [username, hashedPassword, salt, height, weight])
    });
}

export async function updateHeight(username: string, height: number){
    executeQuery(`UPDATE users SET height = ? WHERE username = ?`, [height, username]);
}

export async function updateWeight(username: string, weight: number){
    executeQuery(`UPDATE users SET weight = ? WHERE username = ?`, [weight, username]);
}

export async function updatePassword(username: string, password: string) {
    await errorHandler(async () => {
        password = createHash('sha256').update(password).digest('hex');
        return await executeQuery(`UPDATE users SET password = ? WHERE username = ?`, [password, username]);
    });
}

export async function loginUser(username: string, password: string) {
    const result = await errorHandler(async () => {
        password = createHash('sha256').update(password).digest('hex');
        return await executeQuery(`SELECT id FROM users WHERE username = ? AND password = ?`, [username, password]);
    });

    return result;
}

export async function getUserInfo(userID: number = -1, username: string = ""){
    return errorHandler(async () => {
        return await executeQuery(`SELECT username, height, weight FROM users WHERE id = ? or username = ?`, [userID, username]);
    });
}




// Save a meal starting with inserting the meal into the savedMeael table
    async function saveMeal(userId: number, name: string, description: string, calories: number, protein: number, carbohydrates: number, fat:number ,items: { food: string, quantity: number }[]) {
        const mealInsertResult = await executeQuery(
            `INSERT INTO savedMeals(user, name, description, calories, protein, carbohydrates, fat ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, name, description, calories, protein, fat, carbohydrates]
        );

        // Check result isn't empty & then get lastId
        if (mealInsertResult && mealInsertResult.length > 0) {
            const mealId = mealInsertResult[0].lastID; 

        // Insert the meal into savedMealItem table
        for (const item of items) { // meal items
            await executeQuery(
                `INSERT INTO savedMealItem(meal, food, quantity, calories, protein, fat, carbohydrates) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [mealId, item.food, item.quantity, calories, protein, fat, carbohydrates]
            );
        }
    } else {
        throw new Error("Failed to insert the meal into the database.");
    }

    // Fetch user's saved meals 
    async function getSavedMeals(userId: number) {
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
        try { await openDB(); if (db) { 
            // delete all rows from fav.Foods table, of the selected userId 
            await db.run(
                `DELETE FROM favoriteFoods WHERE user = ?`,
                [userId]); 
                // logging message to the console to indicate that all fav.foods are deleted from db
                console.log("All fav. foods are cleared."); 
            } 
        } catch (error) { 
            console.error("Error deleting favorite foods:", error); 
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
        switch (datetime){
            case 'Today':
                startProgInterval  = new Date();
                endProgInterval    = new Date();
                break;
            case 'Weekly':
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

// Store user's progress
    export async function storeUserProgress(userId:number, progressValue: number) {
        const CURRENT_TIMESTAMP = new Date().toISOString();
        await executeQuery(
            `   INSERT INTO userProgress (userId, progressValue, date) VALUES (?,?,?)`,
            [userId, progressValue, CURRENT_TIMESTAMP]
        )
    }

// Retrieve user's progress intervall
    export async function getProgInterval(userId: number, interval: string) {
        let startDateSlope, endDateSlope;
        switch (interval) {
            case 'today':
                startDateSlope = new Date().toISOString().split('T')[0];
                endDateSlope = startDateSlope;
                break;
            case 'this_week':
                startDateSlope = new Date();
                startDateSlope.setDate(startDateSlope.getDate() - startDateSlope.getDay()); // Start on sunday
                endDateSlope = new Date();
                endDateSlope.setDate(endDateSlope.getDate() + (6 - endDateSlope.getDay())); // End on saturday
                startDateSlope = startDateSlope.toISOString().split('T')[0];
                endDateSlope = endDateSlope.toISOString().split('T')[0];
                break;
            case 'this_month':
                startDateSlope = new Date();
                startDateSlope.setDate(1); // Start of the month
                endDateSlope = new Date();
                endDateSlope.setMonth(endDateSlope.getMonth() + 1); // End of the month
                endDateSlope.setDate(0); // Last day of the previous month
                startDateSlope = startDateSlope.toISOString().split('T')[0];
                endDateSlope = endDateSlope.toISOString().split('T')[0];
                break;
            default:
                throw new Error('Invalid interval type');
        }
    
        // Query to retrieve progress of a specified interval
        return await executeQuery(
            `SELECT * FROM user_progress WHERE user_id = ? AND date BETWEEN ? AND ?`,
            [userId, startDateSlope, endDateSlope]
        );
    }

type errorHandlerFunction = () => Promise<databaseReturnType | undefined>;
async function errorHandler(fn: errorHandlerFunction): Promise<databaseReturnType | undefined> {
    try {
        return await fn();
    }
    catch(e) {
        console.log(e); // or maybe console.e("Error:", e);
        return undefined;
    }
}
