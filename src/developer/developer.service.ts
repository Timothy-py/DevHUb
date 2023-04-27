import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from './entities/developer.entity';
import { Repository } from 'typeorm';
import { CreateDeveloperDto, UpdateDeveloperDto } from './dto';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(Developer) 
    private readonly developerRepository: Repository<Developer>,
    private readonly logger: Logger
  ){}

  // CREATE A DEVELOPER ITEM
  async create(dto: CreateDeveloperDto): Promise<Developer> {
    try {
      const devObj = this.developerRepository.create(dto)

      const dev = this.developerRepository.save(devObj)
      this.logger.log('Developer created successfully', DeveloperService.name)
      return dev
    } catch (error) {
      this.logger.error('Unable to create developer', error.stack, DeveloperService.name)
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // RETURN ALL DEVELOPERS
  findAll(page: number=1):Promise<Developer[]> {
    try {
      // pagination
      const take = 20;
      const skip = take * (page -1)

      const devs = this.developerRepository.find({
        skip,
        take
      })
      this.logger.log('Fetch all developers successfully', DeveloperService.name)
      return devs
    } catch (error) {
      this.logger.error('Unable to fetch all developers', error.stack, DeveloperService.name)
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
