const fs = require("fs");

function generateTestFile(template) {
  const testCases = [];

  function generateTestCases(field, parent) {
    if (!field.fields) {
      // Generate test cases for leaf fields
      testCases.push(
        `\n\tit('should validate ${parent}.${field.name}', async () => {` +
        `\n\t\t// Create a test object with invalid ${parent}.${field.name}` +
        `\n\t\tlet invalidDto = { ...testDto };` +
        `\n\t\tinvalidDto.${parent}.${field.name} = /* set invalid value */;` +
        `\n\t\tinvalidDto = plainToInstance(${template.name}, invalidDto);` +
        `\n\t\tawait dtoError(invalidDto, '${parent}.${field.name} validation error message');` +
        `\n\t});`
      );
    } else {
      // Recursively generate test cases for nested fields
      field.fields.forEach(subField => {
        generateTestCases(subField, parent.concat(`.${field.name}`));
      });
    }
  }

  // Generate test cases for the template
  template.fields.forEach(field => {
    generateTestCases(field, template.name);
  });

  const testFile = [
    "import { plainToInstance } from 'class-transformer';",
    "import { validate } from 'class-validator';",
    `import { ${template.name} } from './generated-dto';`,
    "// Import other necessary dependencies",
    "",
    `describe('${template.name} Validation', () => {`,
    "\tlet testDto: ${template.name};",
    "\tbeforeEach(() => {",
    `\t\ttestDto = plainToInstance(${template.name}, mockOpenNPSAccountRequest);`,
    "\t});",
    "",
    "\tit('should be valid', async () => {",
    "\t\tconst errors = await validate(testDto);",
    "\t\texpect(errors.length).toBe(0);",
    "\t});",
    ...testCases,
    "});",
  ];

  return testFile.join("\n");
}

const testFileContent = generateTestFile(require("./template.sample.ts").templateSample);

// Write the generated test file to a file (optional)
fs.writeFileSync(
  './dto/generate-dto.spec.ts',
  testFileContent,
  "utf-8"
);

console.log(testFileContent);
