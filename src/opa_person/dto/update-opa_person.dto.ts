import { PartialType } from '@nestjs/mapped-types';
import { CreateOpaPersonDto } from './create-opa_person.dto';

export class UpdateOpaPersonDto extends PartialType(CreateOpaPersonDto) {}
