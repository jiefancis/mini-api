import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodGroup } from '../../entities/good_group.entity';
import { GoodGroupController } from './good_group.controller';
import { GoodGroupService } from './good_group.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodGroup])],
  controllers: [GoodGroupController],
  providers: [GoodGroupService],
  exports: [],
})
export class GoodGroupModule {}
