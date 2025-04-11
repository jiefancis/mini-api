import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodGroup } from '../../entities/good_group.entity';
import { Group } from '../../entities/group.entity';
import { GoodGroupController } from './group.controller';
import { GoodGroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group, GoodGroup])],
  controllers: [GoodGroupController],
  providers: [GoodGroupService],
  exports: [],
})
export class GroupModule {}
