import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from './entities/developer.entity';
import { Repository } from 'typeorm';
import { CreateDeveloperDto, UpdateDeveloperDto } from './dto';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(Developer) 
    private readonly developerRepository: Repository<Developer>
  ){}

  // CREATE A DEVELOPER ITEM
  async create(dto: CreateDeveloperDto): Promise<Developer> {
    try {
      const devObj = this.developerRepository.create(dto)

      const dev = this.developerRepository.save(devObj)
      return dev
    } catch (error) {
      console.log(error)
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // RETURN ALL DEVELOPERS
  findAll():Promise<Developer[]> {
    try {
      const devs = this.developerRepository.find()
      return devs
    } catch (error) {
      console.log(error)
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} developer`;
  }

  update(id: number, updateDeveloperDto: UpdateDeveloperDto) {
    return `This action updates a #${id} developer`;
  }

  remove(id: number) {
    return `This action removes a #${id} developer`;
  }
}
