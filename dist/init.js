"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
async function main() {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log("Database initialized!");
        const migrations = await data_source_1.AppDataSource.runMigrations();
        if (migrations.length) {
            console.log(`${migrations.length} migration(s) executed:`);
            migrations.forEach(mig => console.log(`- ${mig.name}`));
        }
        else {
            console.log("No new migrations to run.");
        }
        process.exit(0);
    }
    catch (err) {
        console.error("Error initializing database or running migrations:", err);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=init.js.map