import { z} from 'zod'
import dotenv from "dotenv";

dotenv.config({ path: `.env.development` });


// Load environment variables
const envData = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    // dbHost: process.env.DB_HOST || "localhost",
    // dbPort: process.env.DB_PORT || 27017,
    // dbName: process.env.DB_NAME || "template",
    // dbUser: process.env.DB_USER || "root",
    // dbPassword: process.env.DB_PASSWORD || "root",
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "refreshSecret",
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || "accessSecret",
    jwtAccessExpire: process.env.JWT_ACCESS_EXPIRE || "1d",
    jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE || "7d"

}

// Validate environment variables using Zod
const envSchema = z.object({
    nodeEnv: z.enum(["development", "production", "test"]),
    port: z.coerce.number().default(3000),
    // dbHost: z.string().default("localhost"),
    // dbPort: z.coerce.number().default(27017),
    // dbName: z.string().default("template"),
    // dbUser: z.string().default("root"),
    // dbPassword: z.string().default("root"),
    jwtRefreshSecret: z.string().default("refreshSecret"),
    jwtAccessSecret: z.string().default("accessSecret"),
    jwtAccessExpire: z.string().default("1d"),
    jwtRefreshExpire: z.string().default("7d")
})


// Export environment variables
export const env = envSchema.parse(envData);