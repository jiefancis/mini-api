import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async findAll(userId: number): Promise<Address[]> {
    return await this.addressRepository.find({ where: { id: userId } });
  }

  async findOne(id: number): Promise<Address> {
    return await this.addressRepository.findOne({ where: { id } });
  }

  async create(address: Address): Promise<Address> {
    return await this.addressRepository.save(address);
  }

  async update(id: number, address: Address): Promise<any> {
    return await this.addressRepository.update(id, address);
  }
}
