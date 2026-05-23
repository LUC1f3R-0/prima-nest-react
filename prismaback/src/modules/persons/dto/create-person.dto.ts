import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDateString,
  IsArray,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';

class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsDateString()
  dateOfBirth: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];
}

export { CreatePersonDto };
