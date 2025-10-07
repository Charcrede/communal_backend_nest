import "reflect-metadata";
import { DataSource } from "typeorm";
import { Admin } from "./modules/admins/entities/admin.entity";
import { User } from "./modules/users/entities/user.entity";
import { Article } from "./modules/articles/entities/article.entity";
import { Media } from "./modules/media/entities/media.entity";
import { Rubric } from "./modules/rubrics/entities/rubric.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",        // ton mot de passe PG
    database: "communal",
    entities: [Admin, User, Article, Media, Rubric],
    synchronize: true,       // ⚠️ ça crée direct les tables, pas besoin de migrations
    logging: false
});
