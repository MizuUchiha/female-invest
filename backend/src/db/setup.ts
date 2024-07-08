import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db: any;

export async function setupDatabase() {
    if (!db) {
        db = await open({
            filename: './database.sqlite',
            driver: sqlite3.Database
        });

        const tableExists = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='courses'");
        if (!tableExists) {
            await db.exec(`
                CREATE TABLE courses (
                id INTEGER PRIMARY KEY,
                title TEXT,
                author TEXT,
                lessons INTEGER,
                time TEXT,
                likes INTEGER,
                coverImage TEXT
                )
            `);
            await db.run(
                `INSERT INTO courses (title, author, lessons, time, likes, coverImage) 
                VALUES 
                ('Intro to Investing', 'Alice Haraldsson', 7, '3h', 546, 'image_intro_to_investing.png'),
                ('Propel Your Career', 'Barbara Montesano', 5, '2.5h', 988, 'image_propel_your_career.png'),
                ('Complete Guide to Saving', 'Alice Haraldsson', 4, '1.5h', 211, 'image_complete_guide_to_saving.png'),
                ('Understanding Credit', 'Barbara Montesano', 8, '4h', 155, 'image_understanding_credit.png'),
                ('Family Financial Planning', 'Rosalie Le Guen', 3, '1.5h', 466, 'image_family_financial_planning.png'),
                ('Planning', 'Rosalie Le Guen', 4, NULL, NULL, 'image_planning.png')`
            );
        }

        const userTableExists = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
        if (!userTableExists) {
            await db.exec(`
                CREATE TABLE users (
                userID INTEGER,
                courseID INTEGER,
                progress INTEGER,
                liked INTEGER,
                PRIMARY KEY (userID, courseID),
                FOREIGN KEY(courseID) REFERENCES courses(id)
                )
            `);
            

            await db.run(`
                INSERT INTO users (userID, courseID, progress, liked) 
                VALUES 
                (1, 1, 100, 1),
                (1, 2, 50, 1),
                (1, 3, 30, 0),
                (2, 1, 10, 0),
                (2, 2, 40, 0),
                (2, 3, 30, 0),
                (3, 1, 10, 0),
                (3, 2, 60, 0),
                (3, 3, 90, 0)
            `);
        }
    }
    return db;
}

export async function getDatabase() {
    if (!db) {
        console.log("Database not initialized. Setting up database...");
        db = await setupDatabase();
    } else {
        console.log("Database already initialized.");
    }
    console.log('db', db);
    return db;
}
