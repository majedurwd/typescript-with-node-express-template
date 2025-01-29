import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../config';

// Interface for JWT Payload
export interface JWTPayload extends JwtPayload {
    userId?: string;
    sessionId?: string;
    name?: string;
    email?: string;
    role?: string;
}

// Enum for token type
export enum TokenType {
    ACCESS = 'ACCESS',
    REFRESH = 'REFRESH'
}

// Interface for creating JWT token parameters
export interface CreateJWTTokenParams {
    payload: JWTPayload;
    type: TokenType;
    secret?: string;
    expiresIn?: string | number;
}

// Create a new JWT token
export const createJWTToken = ({ payload, type, secret, expiresIn }: CreateJWTTokenParams) => {
    if (type === TokenType.ACCESS) {
        const JwtSecret = secret || env.jwtAccessSecret;
        const JwtExpiresIn = expiresIn || env.jwtAccessExpire;
        return jwt.sign({ payload }, JwtSecret, { expiresIn: JwtExpiresIn });
    }
    const JwtSecret = secret || env.jwtRefreshSecret;
    const JwtExpiresIn = expiresIn || env.jwtRefreshExpire;
    return jwt.sign({ payload }, JwtSecret, { expiresIn: JwtExpiresIn });
};

// Verify the existing token
export const verifyToken = (token: string, type: TokenType): JWTPayload => {
    const secret = type === TokenType.ACCESS ? env.jwtAccessSecret : env.jwtRefreshSecret;
    return jwt.verify(token, secret) as JWTPayload;
};
