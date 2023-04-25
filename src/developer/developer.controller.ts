import { Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { CreateDeveloperDto, UpdateDeveloperDto } from './dto';
import { BasePath } from 'src/decorators';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('Developers')
@BasePath('developers')
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @HttpCode(200)
  @ApiOperation({summary: "Create developer"})
  @ApiBody({type: CreateDeveloperDto})
  @Post()
  create(@Body() dto: CreateDeveloperDto) {
    return this.developerService.create(dto);
  }

  @Get()
  findAll() {
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
