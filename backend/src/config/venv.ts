import dotenv from 'dotenv';

dotenv.config();

export let db_host: string
export let db_port: number
export let db_user: string
export let db_pass: string
export let db_name: string
export let jwt_secret_key: string