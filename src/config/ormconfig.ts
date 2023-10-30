import path from "path";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'rosie.db.elephantsql.com',
    port: 5432,
    username: 'vieywpvg',
    password: '3DlM8TeI-jNpHUH0lWiHB09hEmiuYZYA',
    database: 'vieywpvg',
    synchronize: true,
    entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')]
})