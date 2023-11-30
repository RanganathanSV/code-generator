import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { User } from './generated-dto';
// Import other necessary dependencies

describe('User Validation', () => {
	let testDto: ${template.name};
	beforeEach(() => {
		testDto = plainToInstance(User, mockOpenNPSAccountRequest);
	});

	it('should be valid', async () => {
		const errors = await validate(testDto);
		expect(errors.length).toBe(0);
	});

	it('should validate User.username', async () => {
		// Create a test object with invalid User.username
		let invalidDto = { ...testDto };
		invalidDto.User.username = /* set invalid value */;
		invalidDto = plainToInstance(User, invalidDto);
		await dtoError(invalidDto, 'User.username validation error message');
	});

	it('should validate User.password', async () => {
		// Create a test object with invalid User.password
		let invalidDto = { ...testDto };
		invalidDto.User.password = /* set invalid value */;
		invalidDto = plainToInstance(User, invalidDto);
		await dtoError(invalidDto, 'User.password validation error message');
	});

	it('should validate User.address.line1', async () => {
		// Create a test object with invalid User.address.line1
		let invalidDto = { ...testDto };
		invalidDto.User.address.line1 = /* set invalid value */;
		invalidDto = plainToInstance(User, invalidDto);
		await dtoError(invalidDto, 'User.address.line1 validation error message');
	});

	it('should validate User.address.line2', async () => {
		// Create a test object with invalid User.address.line2
		let invalidDto = { ...testDto };
		invalidDto.User.address.line2 = /* set invalid value */;
		invalidDto = plainToInstance(User, invalidDto);
		await dtoError(invalidDto, 'User.address.line2 validation error message');
	});

	it('should validate User.address.country', async () => {
		// Create a test object with invalid User.address.country
		let invalidDto = { ...testDto };
		invalidDto.User.address.country = /* set invalid value */;
		invalidDto = plainToInstance(User, invalidDto);
		await dtoError(invalidDto, 'User.address.country validation error message');
	});

	it('should validate User.address.state', async () => {
		// Create a test object with invalid User.address.state
		let invalidDto = { ...testDto };
		invalidDto.User.address.state = /* set invalid value */;
		invalidDto = plainToInstance(User, invalidDto);
		await dtoError(invalidDto, 'User.address.state validation error message');
	});

	it('should validate User.address.city', async () => {
		// Create a test object with invalid User.address.city
		let invalidDto = { ...testDto };
		invalidDto.User.address.city = /* set invalid value */;
		invalidDto = plainToInstance(User, invalidDto);
		await dtoError(invalidDto, 'User.address.city validation error message');
	});
});