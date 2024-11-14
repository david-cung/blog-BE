import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

export const AppDataSource = new DataSource({
  host: process.env.DATABASE_HOST,
  type: 'mysql',
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB_NAME,
  migrations: ['src/database/migrations/*.ts'],
  logging: true,
  synchronize: true,
  entities: ['../src/**/*.entity.ts'],
})
