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
                lessonsCount INTEGER,
                estimatedTime TEXT,
                likes INTEGER,
                coverImage TEXT,
                completionPercentage INTEGER
                )
            `);
            await db.run(
                `INSERT INTO courses (title, author, lessonsCount, estimatedTime, likes, coverImage, completionPercentage) 
                VALUES 
                ('Intro to Investing', 'Alice Haraldsson', 7, '3h', 546, 'image_intro_to_investing.png', 43),
                ('Propel Your Career', 'Barbara Montesano', 5, '2.5h', 988, 'image_propel_your_career.png', 71),
                ('Complete Guide to Saving', 'Alice Haraldsson', 4, '1.5h', 211, 'image_complete_guide_to_saving.png', NULL),
                ('Understanding Credit', 'Barbara Montesano', 8, '4h', 155, 'image_understanding_credit.png', NULL),
                ('Family Financial Planning', 'Rosalie Le Guen', 3, '1.5h', 466, 'image_family_financial_planning.png', NULL),
                ('Planning', 'Rosalie Le Guen', 4, NULL, NULL, 'image_planning.png', NULL)`
            );

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
