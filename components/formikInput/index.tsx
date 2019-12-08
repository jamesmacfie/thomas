import React, { InputHTMLAttributes, ReactNode } from 'react';
import { Field, FieldProps, connect } from 'formik';
import Input from 'components/input';
import Label from 'components/label';
import Icon from './icon';
import Select from './select';
import Map from './map';
import Code from './code';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  value?: string | number;
  values?: any;
  formik?: {
    errors: any;
    touched: boolean;
  };
  type?: string;
  className?: string;
}

interface FieldErrorProps {
  children: ReactNode;
}

export const FieldError = ({ children }: FieldErrorProps) => {
  return <p className="mt-1 mb-3 text-xs text-red-light">{children}</p>;
};

const FormikInput = ({ value, label, name, formik, type, className, ...props }: Props) => {
  const errors = formik!.errors;

  return (
    <Field
      name={name}
      render={({ field, form }: FieldProps) => {
        let input;
        if (type === 'icon') {
          input = <Icon form={form} {...field} {...props} />;
        } else if (type === 'map') {
          input = <Map form={form} {...field} {...props} />;
        } else if (type === 'code') {
          input = <Code form={form} {...field} {...props} />;
        } else if (type === 'select') {
          input = <Select value={value} name={name} form={form} {...props} />;
        } else {
          input = <Input className="block mb-4 w-full" {...field} {...props} />;
        }
        return (
          <>
            {label && <Label className="mb-2">{label}</Label>}
            {input}
            {errors && errors[name] && <FieldError>{errors[name]}</FieldError>}
          </>
        );
      }}
    />
  );
};

export default connect(FormikInput);
