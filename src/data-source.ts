import "reflect-metadata";
import { DataSource } from "typeorm";
import { Admin } from "./modules/admins/entities/admin.entity";
import { User } from "./modules/users/entities/user.entity";
import { Article } from "./modules/articles/entities/article.entity";
import { Media } from "./modules/media/entities/media.entity";
import { Rubric } from "./modules/rubrics/entities/rubric.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: process.env.DATABASE_NAME,
    entities: [Admin, User, Article, Media, Rubric],
    synchronize: false,
    logging: false,
    migrations: ["src/migrations/*.ts"],
});
