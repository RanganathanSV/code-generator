const fs = require("fs");
const { templateSample: template } = require("./template.sample.ts");

function generateDTOCode(template, allValidators, parent) {
  const properties = template.fields.map((field) => {
    const {
      name,
      type,
      validators,
      regex,
      required,
    } = field;

    const errorMessage = `dto.${field.name}.errors.default`;
    const description = `dto.${field.name}.descriptions.default`;
    const standardValidators = validators
      .map((validator) => {
        if (validator === "Matches") {
          return `\t@${validator}(${regex}, { message: ${errorMessage} }) // Update it according to the requirement`;
        } else if (validator === "IsNumber") {
          return `\t@${validator}({}, { message: ${errorMessage} }) // Update it according to the requirement`;
        } else {
          return `\t@${validator}({ message: ${errorMessage} }) // Update it according to the requirement`;
        }
      })
      .join("\n");

    allValidators.push(...validators);

    return (
      `\n\t@ApiProperty({` +
      `\n\t\ttype: ${CapitalizeFirstLetter(type)},` +
      `\n\t\trequired: ${required ? "true" : "false"},` +
      `\n\t\tdescription: ${description}, // Update it according to the requirement` +
      `\n\t\texample: ${parent}.${name} // Update it with proper mock request object name` +
      `\n\t})` +
      `\n${standardValidators}\n\t${name}: ${type};`
    );
  });

  const comments = `/**\n * DTO Class for ${template.name}\n */`;

  const code = [
    comments,
    `export class ${CapitalizeFirstLetter(template.name)} {`,
    ...properties,
    "}\n",
  ];

  return code.join("\n");
}

function CapitalizeFirstLetter(data) {
  return `${data[0].toUpperCase() + data.slice(1)}`
}

function makeNestedDto(template, dtoClasses, allValidators, parent) {
  template.fields.map(field => {
    if(field.fields) {
      dtoClasses.push(generateDTOCode(field, allValidators, parent.concat(`.${field.name}`)))
      makeNestedDto(field, dtoClasses, allValidators, parent.concat(`.${field.name}`))
    }
  })
}

function generateMainDTOCode(template) {
  const allValidators = [];
  const dtoClasses = []
  const parent = "mockRequest"

  // Making the nested DTOs
  makeNestedDto(template, dtoClasses, allValidators, parent)

  // Making the Main DTO
  dtoClasses.push(generateDTOCode(template, allValidators, parent))

  const classValidators = Array.from(new Set(allValidators));
  const code = [
    "import { REGEX_PATTERN } from '@idb-dab/ms-regex-validations'; // Remove if not necessary",
    `import { ${classValidators.join(", ")} } from 'class-validator';`,
    "import { dto } from '../../common/messages/dto'; // Update it with proper import path",
    "import { ApiProperty } from '@nestjs/swagger';",
    "import { mockRequest } from '../req-res/request.sample'; // Update it with proper import path",
    "",
    ...dtoClasses,
  ];

  return code.join("\n");
}


const generatedCode = generateMainDTOCode(template);

// Write the generated code to a file (optional)
fs.writeFileSync(
  './dto/generated-dto.ts',
  generatedCode,
  "utf-8"
);

console.log(generatedCode);