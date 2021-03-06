import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();
export const configService = new ConfigService();

// Kafka
export const BROKER_HOST = configService.get('BROKER_HOST');
export const BROKER_PORT = configService.get('BROKER_PORT');

// GRPC
export const GRPC_HOST = configService.get('GRPC_HOST');
export const GRPC_PORT = configService.get('GRPC_PORT');
