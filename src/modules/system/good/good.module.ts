import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from 'src/entities/good.entity';
import { Category } from 'src/entities/category.entity';
import { GoodGroup } from 'src/entities/good_group.entity';
import { GoodController } from './good.controller';
import { GoodService } from './good.service';

@Module({
  imports: [TypeOrmModule.forFeature([Good, Category, GoodGroup])],
  controllers: [GoodController],
  providers: [GoodService],
  exports: [],
})
export class GoodModule {}
