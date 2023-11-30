import { REGEX_PATTERN } from '@idb-dab/ms-regex-validations'; // Remove if not necessary
import { IsString, IsNotEmpty, IsOptional, Matches,  } from 'class-validator';
import { dto } from '../../common/messages/dto'; // Update it with proper import path
import { ApiProperty } from '@nestjs/swagger';
import { mockRequest } from '../req-res/request.sample'; // Update it with proper import path

/**
 * DTO Class for address
 */
export class Address {

	@ApiProperty({
		type: String,
		required: false,
		description: dto.line1.descriptions.default, // Update it according to the requirement
		example: mockRequest.address.line1 // Update it with proper mock request object name
	})
	@IsString({ message: dto.line1.errors.default }) // Update it according to the requirement
	@IsNotEmpty({ message: dto.line1.errors.default }) // Update it according to the requirement
	line1: string;

	@ApiProperty({
		type: String,
		required: false,
		description: dto.line2.descriptions.default, // Update it according to the requirement
		example: mockRequest.address.line2 // Update it with proper mock request object name
	})
	@IsString({ message: dto.line2.errors.default }) // Update it according to the requirement
	@IsOptional({ message: dto.line2.errors.default }) // Update it according to the requirement
	line2: string;

	@ApiProperty({
		type: String,
		required: false,
		description: dto.country.descriptions.default, // Update it according to the requirement
		example: mockRequest.address.country // Update it with proper mock request object name
	})
	@IsString({ message: dto.country.errors.default }) // Update it according to the requirement
	@IsNotEmpty({ message: dto.country.errors.default }) // Update it according to the requirement
	country: string;

	@ApiProperty({
		type: String,
		required: false,
		description: dto.state.descriptions.default, // Update it according to the requirement
		example: mockRequest.address.state // Update it with proper mock request object name
	})
	@IsString({ message: dto.state.errors.default }) // Update it according to the requirement
	@IsNotEmpty({ message: dto.state.errors.default }) // Update it according to the requirement
	state: string;

	@ApiProperty({
		type: String,
		required: false,
		description: dto.city.descriptions.default, // Update it according to the requirement
		example: mockRequest.address.city // Update it with proper mock request object name
	})
	@IsString({ message: dto.city.errors.default }) // Update it according to the requirement
	@IsNotEmpty({ message: dto.city.errors.default }) // Update it according to the requirement
	city: string;
}

/**
 * DTO Class for User
 */
export class User {

	@ApiProperty({
		type: String,
		required: true,
		description: dto.username.descriptions.default, // Update it according to the requirement
		example: mockRequest.username // Update it with proper mock request object name
	})
	@IsNotEmpty({ message: dto.username.errors.default }) // Update it according to the requirement
	@IsString({ message: dto.username.errors.default }) // Update it according to the requirement
	@Matches(REGEX_PATTERN.username, { message: dto.username.errors.default }) // Update it according to the requirement
	username: string;

	@ApiProperty({
		type: String,
		required: false,
		description: dto.password.descriptions.default, // Update it according to the requirement
		example: mockRequest.password // Update it with proper mock request object name
	})
	@IsNotEmpty({ message: dto.password.errors.default }) // Update it according to the requirement
	@IsString({ message: dto.password.errors.default }) // Update it according to the requirement
	password: string;

	@ApiProperty({
		type: Address,
		required: false,
		description: dto.address.descriptions.default, // Update it according to the requirement
		example: mockRequest.address // Update it with proper mock request object name
	})
	@({ message: dto.address.errors.default }) // Update it according to the requirement
	address: Address;
}
