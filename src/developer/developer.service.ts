import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Developer } from './entities/developer.entity';
import { Repository } from 'typeorm';
import { CreateDeveloperDto, UpdateDeveloperDto } from './dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(Developer)
    private readonly developerRepository: Repository<Developer>,
    private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  SERVICE: string = DeveloperService.name;

  // ************CREATE A DEVELOPER ITEM***************
  async create(dto: CreateDeveloperDto): Promise<Developer> {
    try {
      const devObj = this.developerRepository.create(dto);

      const dev = await this.developerRepository.save(devObj);

      this.logger.log('Developer created successfully', this.SERVICE);

      return dev;
    } catch (error) {
      this.logger.error(
        'Unable to create developer',
        error.stack,
        this.SERVICE,
      );

      if (error.code === 'SQLITE_CONSTRAINT')
        throw new HttpException(
          'Email address already exists',
          HttpStatus.CONFLICT,
        );

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // *********RETURN ALL DEVELOPERS*****************
  findAll(page = 1): Promise<Developer[]> {
    try {
      // pagination
      const take = 5;
      const skip = take * (page - 1);

      const devs = this.developerRepository.find({
        skip,
        take,
      });

      this.logger.log('Fetch all developers successfully', this.SERVICE);

      return devs;
    } catch (error) {
      this.logger.error(
        'Unable to fetch all developers',
        error.stack,
        this.SERVICE,
      );

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // *************FIND DEVELOPERS BY LEVEL*************
  async findByLevel(level: string): Promise<Developer[]> {
    try {
      const devs = await this.developerRepository.findBy({
        level,
      });

      this.logger.log(`Developers fetched by levels-${level}`, this.SERVICE);

      return devs;
    } catch (error) {
      this.logger.error(
        `Unable to fetch developers by level-${level}`,
        error.stack,
        this.SERVICE,
      );

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // *************** GET THE DETAILS OF A DEVELOPER **********
  async findOne(id: any): Promise<Developer> {
    try {
      // first check if dev data is available in cache memory
      const cacheKey = `developer_${id}`;
      let dev: Developer = await this.cacheManager.get(cacheKey);

      // if it is not available
      if (!dev) {
        dev = await this.developerRepository.findOne({
          where: {
            id,
          },
        });

        if (dev === null) throw new NotFoundException();

        // save dev data into cache memory
        await this.cacheManager.set(cacheKey, dev);
      }

      this.logger.log(`Query executed to GET developer - ${id}`, this.SERVICE);

      return dev;
    } catch (error) {
      if (error.message === 'Not Found')
        throw new NotFoundException('Developer does not exist');

      this.logger.error(
        `Unable to GET the developer-${id} details`,
        error.stack,
        this.SERVICE,
      );

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // *****************UPDATE A DEVELOPER*****************
  async update(id: any, updateDeveloperDto: UpdateDeveloperDto) {
    try {
      await this.developerRepository.update(id, updateDeveloperDto);

      // remove dev from cache
      const cacheKey = `developer_${id}`;
      await this.cacheManager.del(cacheKey);

      const dev = await this.developerRepository.findOne({ where: { id } });

      if (dev === null) throw new NotFoundException();

      this.logger.log(
        `Query executed to UPDATE developer - ${id}`,
        this.SERVICE,
      );
      return dev;
    } catch (error) {
      if (error.message === 'Not Found')
        throw new NotFoundException('Developer does not exist');

      this.logger.error(
        `Unable to UPDATE the developer-${id}`,
        error.stack,
        this.SERVICE,
      );

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ************** DELETE A DEVELOPER ****************
  async delete(id: any) {
    try {
      await this.developerRepository.delete({
        id,
      });

      // remove dev from cache
      const cacheKey = `developer_${id}`;
      await this.cacheManager.del(cacheKey);

      return;
    } catch (error) {
      this.logger.error(
        `Unable to DELETE the developer-${id}`,
        error.stack,
        this.SERVICE,
      );

      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
