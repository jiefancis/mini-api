import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { RabbitMQService } from 'src/modules/rabbitmq/rabbitmq-amqplib.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [OrderService, RabbitMQService],
  exports: [OrderService],
})
export class OrderModule {}
