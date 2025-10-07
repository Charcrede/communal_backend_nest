"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("./modules/admins/entities/admin.entity");
const user_entity_1 = require("./modules/users/entities/user.entity");
const article_entity_1 = require("./modules/articles/entities/article.entity");
const media_entity_1 = require("./modules/media/entities/media.entity");
const rubric_entity_1 = require("./modules/rubrics/entities/rubric.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "communal",
    entities: [admin_entity_1.Admin, user_entity_1.User, article_entity_1.Article, media_entity_1.Media, rubric_entity_1.Rubric],
    synchronize: true,
    logging: false
});
//# sourceMappingURL=data-source.js.map