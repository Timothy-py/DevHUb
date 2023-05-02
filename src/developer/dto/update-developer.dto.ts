// import { OmitType, PartialType } from '@nestjs/mapped-types';
// import { CreateDeveloperDto } from './create-developer.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Level } from './enum.level';

// export class UpdateDeveloperDto extends OmitType(CreateDeveloperDto, ['email']) {}
export class UpdateDeveloperDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsEnum(Level)
  readonly level: Level;
}
