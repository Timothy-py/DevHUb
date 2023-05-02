import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Level } from './enum.level';

export class CreateDeveloperDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsEnum(Level)
  readonly level: Level;
}
