const templateSample = {
  name: "User",
  fields: [
    {
      name: "username",
      type: "string",
      validators: ["IsNotEmpty", "IsString", "Matches"],
      regex: "REGEX_PATTERN.username",
      required: true,
    },
    {
      name: "password",
      type: "string",
      validators: ["IsNotEmpty", "IsString"],
    },
    {
      name: "address",
      type: "Address",
      validators: [""],
      fields: [
        {
          name: "line1",
          type: "string",
          validators: ["IsString", "IsNotEmpty"],
        },
        {
          name: "line2",
          type: "string",
          validators: ["IsString", "IsOptional"]
        },
        {
          name: "country",
          type: "string",
          validators: ["IsString", "IsNotEmpty"]
        },
        {
          name: "state",
          type: "string",
          validators: ["IsString", "IsNotEmpty"]
        },
        {
          name: "city",
          type: "string",
          validators: ["IsString", "IsNotEmpty"]
        }
      ]
    }
  ]
};

module.exports = { templateSample }