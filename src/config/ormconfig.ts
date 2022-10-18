import path from "path";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'XackPro0893',
    database: 'exam_maket',
    synchronize: true,
    entities: [path.join(__dirname, '..', 'entities', '*.entity.{ts,js}')]
})