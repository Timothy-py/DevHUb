import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  SERVICE:string = DeveloperService.name

  // ************CREATE A DEVELOPER ITEM***************
  async create(dto: CreateDeveloperDto): Promise<Developer> {
    try {
      const devObj = this.developerRepository.create(dto)

      const dev = await this.developerRepository.save(devObj)

      this.logger.log('Developer created successfully', this.SERVICE)

      return dev

    } catch (error) {
      this.logger.error('Unable to create developer', error.stack, this.SERVICE)
      
      if(error.code === "SQLITE_CONSTRAINT") throw new HttpException('Email address already exists', HttpStatus.CONFLICT)

      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // *********RETURN ALL DEVELOPERS*****************
  findAll(page: number=1):Promise<Developer[]> {
    try {
      // pagination
      const take = 20;
      const skip = take * (page -1)

      const devs = this.developerRepository.find({
        skip,
        take
      })

      this.logger.log('Fetch all developers successfully', this.SERVICE)

      return devs
    } catch (error) {
      this.logger.error('Unable to fetch all developers', error.stack, this.SERVICE)
      
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // *************FIND DEVELOPERS BY LEVEL*************
  async findByLevel(level: string):Promise<Developer[]> {
    try {
      const devs = await this.developerRepository.findBy({
        level
      })
  
      this.logger.log(`Developers fetched by levels-${level}`, this.SERVICE)

      return devs;
    } catch (error) {
      this.logger.error(`Unable to fetch developers by level-${level}`, error.stack, this.SERVICE)
      
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // *************** GET THE DETAILS OF A DEVELOPER ********** 
  async findOne(id:any): Promise<Developer> {
    try {
      const dev = await this.developerRepository.findOne({
        where: {
          id
        }
      })

      this.logger.log(`Query executed to GET developer - ${id}`, this.SERVICE) 
      
      return dev
    } catch (error) {
      this.logger.error(`Unable to GET the developer-${id} details`, error.stack, this.SERVICE)
      
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // *****************UPDATE A DEVELOPER*****************
  async update(id: any, updateDeveloperDto: UpdateDeveloperDto) {
    try {
      await this.developerRepository.update(id, updateDeveloperDto)
      
      const dev = await this.developerRepository.findOne({where: {id}})

      if(dev === null) throw new NotFoundException()

      this.logger.log(`Query executed to UPDATE developer - ${id}`, this.SERVICE) 
      return dev;
    } catch (error) {
      if(error.message === 'Not Found') throw new NotFoundException('Developer does not exist')
      
      this.logger.error(`Unable to UPDATE the developer-${id}`, error.stack, this.SERVICE)
      
      throw new HttpException(`${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  delete(id: number) {
    
  }
}
