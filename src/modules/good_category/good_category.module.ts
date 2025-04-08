import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodCategory } from 'src/entities/good_category.entity';
import { GoodCategoryController } from './good_category.controller';
import { GoodCategoryService } from './good_category.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodCategory])],
  controllers: [GoodCategoryController],
  providers: [GoodCategoryService],
  exports: [],
})
export class GoodCategoryModule {}
