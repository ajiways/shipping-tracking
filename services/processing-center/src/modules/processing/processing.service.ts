import { MarketService } from './interface/market';
import { OrderCoordinates } from './../../interface/order';
import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import {
  COORDINATES_KAFKA,
  COORDINATES_GRPC,
  MARKET_SERVICE,
} from './../../constants/constants';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProcessingService {
  private coordinatesService: MarketService;

  constructor(
    @Inject(COORDINATES_KAFKA) private readonly kafkaClient: ClientKafka,
    @Inject(COORDINATES_GRPC) private readonly grpcClient: ClientGrpc,
  ) {
    this.coordinatesService =
      this.grpcClient.getService<MarketService>(MARKET_SERVICE);
  }

  async handed(id: number) {
    await lastValueFrom(this.coordinatesService.handed({ id }));
  }

  async deliviried(id: number) {
    await lastValueFrom(this.coordinatesService.deliviried({ id }));
  }

  async sendCoordinates(order: OrderCoordinates) {
    this.kafkaClient.emit('get.coordinates', order);
  }
}
