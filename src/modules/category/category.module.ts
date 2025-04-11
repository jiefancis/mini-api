import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { GoodCategoryController } from './category.controller';
import { GoodCategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [GoodCategoryController],
  providers: [GoodCategoryService],
  exports: [],
})
export class CategoryModule {}
