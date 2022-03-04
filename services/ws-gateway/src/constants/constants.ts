import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

export const PACKAGE = configService.get<string>('PACKAGE');
export const APP_PORT = configService.get<number>('APP_PORT');
export const GRPC_HOST = configService.get<string>('GRPC_HOST');
export const GRPC_PORT = configService.get<number>('GRPC_PORT');
export const GRPC = configService.get<string>('GRPC');
