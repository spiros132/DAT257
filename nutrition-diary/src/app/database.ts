
import sqlite3, { OPEN_CREATE, OPEN_READWRITE } from 'sqlite3';
import { createHash} from 'crypto';
import { database_location } from './config';
import { open, Database } from "sqlite";

type databaseReturnType = any[] | undefined;

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


export async function registerUser(username: string, password: string, height: number = 0, weight: number = 0){
    password = createHash('sha256').update(password).digest('hex');
    executeQuery(`INSERT INTO users(username, password, height, weight) VALUES(?, ?, ?, ?)`, [username, password, height, weight])
}

export async function updateHeight(username: string, height: number){
    executeQuery(`UPDATE users SET height = ? WHERE username = ?`, [height, username]);
}

export async function updateWeight(username: string, weight: number){
    executeQuery(`UPDATE users SET weight = ? WHERE username = ?`, [weight, username]);
}

export async function updatePassword(username: string, password: string){
    password = createHash('sha256').update(password).digest('hex');
    executeQuery(`UPDATE users SET password = ? WHERE username = ?`, [password, username]);
}

export async function loginUser(username: string, password: string): Promise<boolean> {
    const result = await errorHandler(async () => {
        password = createHash('sha256').update(password).digest('hex');
        return await executeQuery(`SELECT id FROM users WHERE username = ? AND password = ?`, [username, password]);
    });

    console.log(result);

    return false;
}

export async function getUserInfo(username: string): Promise<any[] | undefined>{
    try {
        return await executeQuery(`SELECT username, height, weight FROM users WHERE username = ?`, [username]);
    }
    catch(e) {
        console.log(e);
    }
    
}

type errorHandlerFunction = () => Promise<databaseReturnType>;
async function errorHandler(fn: errorHandlerFunction): Promise<databaseReturnType> {
    try {
        return await fn();
    }
    catch(e) {
        console.log(e);
    }
}