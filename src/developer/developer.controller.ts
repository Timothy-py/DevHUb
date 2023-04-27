import { Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { CreateDeveloperDto, UpdateDeveloperDto } from './dto';
import { BasePath } from 'src/decorators';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Developer } from './entities/developer.entity';


@ApiTags('Developers')
@BasePath('developers')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @HttpCode(201)
  @ApiOperation({summary: "Create developer"})
  @ApiBody({type: CreateDeveloperDto})
  @Post()
  create(@Body() dto: CreateDeveloperDto):Promise<Developer> {
    return this.developerService.create(dto);
  }

  @HttpCode(200)
  @ApiOperation({summary: "Fetch all developers"})
  @Get()
  findAll(): Promise<Developer[]> {
    return this.developerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.developerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeveloperDto: UpdateDeveloperDto) {
    return this.developerService.update(+id, updateDeveloperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.developerService.remove(+id);
  }
}
