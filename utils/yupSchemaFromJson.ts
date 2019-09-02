import * as yup from 'yup';

export function createSchema(schema: any, config: FormConfig) {
  const { key, validationType, validations } = config;
  if (!validationType || !validations) {
    return schema;
  }

  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach((validation: any) => {
    const { params, type } = validation;
    const v = validator as any;
    if (!v[type]) {
      return;
    }
    validator = v[type](...params);
  });
  schema[key] = validator;
  return schema;
}
