import { AppDataSource } from "./data-source";

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database initialized, tables should be created!");
        process.exit(0);
    } catch (err) {
        console.error("Error initializing database:", err);
        process.exit(1);
    }
}

main();
