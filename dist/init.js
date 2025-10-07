"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
async function main() {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log("Database initialized, tables should be created!");
        process.exit(0);
    }
    catch (err) {
        console.error("Error initializing database:", err);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=init.js.map