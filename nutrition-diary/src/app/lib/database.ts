
import sqlite3, { OPEN_CREATE, OPEN_READWRITE } from 'sqlite3';
import { createHash} from 'crypto';
import { database_location } from './config';
import { open, Database } from "sqlite";

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
        newDB.run(
            `CREATE TABLE IF NOT EXISTS savedMealItem(
                meal INTEGER,
                food TEXT NOT NULL,
                quantity INTEGER NOT NULL,
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
      });
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
  executeQuery(`INSERT INTO eatenMeals(user, name, date) VALUES(?, ?, ?, ?)`, [user, name, date])
}

export async function registerEatenMealItem(meal: number, food: string, quantity: number = 0){
  executeQuery(`INSERT INTO eatenMealItem(meal, food, quantity) VALUES(?, ?, ?, ?)`, [meal, food, quantity])
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
  executeQuery(`DELETE FROM eatenMeals WHERE name == ?`, [mealname])
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

export async function registerUser(username: string, password: string, height: number = 0, weight: number = 0){
    return await errorHandler(async () => {
        password = createHash('sha256').update(password).digest('hex');
        return await executeQuery(`INSERT INTO users(username, password, height, weight) VALUES(?, ?, ?, ?)`, [username, password, height, weight])
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


// function to save a meal starting with inserting the meal into the savedMeael table
async function saveMeal(userId: number, name: string, description: string, calories: number, protein: number, carbohydrates: number, fat:number ,items: { food: string, quantity: number }[]) {
    // First, insert the meal into the savedMeals table
    const mealInsertResult = await executeQuery(
        `INSERT INTO savedMeals(user, name, description, calories, protein, carbohydrates, fat ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, name, description]
    );
    if (mealInsertResult && mealInsertResult.length > 0) {
        const mealId = mealInsertResult[0].lastID; // Checking if the result isn'tt empty and then get lastID

    // Insert each meal into the savedMealItem table
    for (const item of items) { // meal items
        await executeQuery(
            `INSERT INTO savedMealItem(meal, food, quantity) VALUES (?, ?, ?)`,
            [mealId, item.food, item.quantity]
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

// Fetch meal items for a saved meal
 async function getMealItems(mealId: number) {
    return executeQuery(
        `SELECT food, quantity FROM savedMealItem WHERE meal = ?`,
        [mealId]
    );
}}






type errorHandlerFunction = () => Promise<databaseReturnType>;
async function errorHandler(fn: errorHandlerFunction): Promise<databaseReturnType> {
    try {
        return await fn();
    }
    catch(e) {
        console.log(e);
    }
}
