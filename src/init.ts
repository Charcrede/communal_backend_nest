import { AppDataSource } from "./data-source";

async function main() {
    try {
        // Initialiser la connexion
        await AppDataSource.initialize();
        console.log("Database initialized!");

        // Exécuter toutes les migrations en attente
        const migrations = await AppDataSource.runMigrations();
        if (migrations.length) {
            console.log(`${migrations.length} migration(s) executed:`);
            migrations.forEach(mig => console.log(`- ${mig.name}`));
        } else {
            console.log("No new migrations to run.");
        }

        process.exit(0);
    } catch (err) {
        console.error("Error initializing database or running migrations:", err);
        process.exit(1);
    }
}

main();
