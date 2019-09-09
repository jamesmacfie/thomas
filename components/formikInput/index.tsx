import React, { InputHTMLAttributes, ReactNode } from 'react';
import { Field, FieldProps, connect } from 'formik';
import Input from 'components/input';
import Label from 'components/label';
import Icon from './icon';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  formik?: {
    errors: any;
    touched: boolean;
  }; // Formik type here?
}

interface FieldErrorProps {
  children: ReactNode;
}

export const FieldError = ({ children }: FieldErrorProps) => {
  return <p className="mt-1 mb-3 text-xs text-red-light">{children}</p>;
};

const FormikInput = ({ label, name, formik, type, ...props }: Props) => {
  const errors = formik!.errors;

  return (
    <Field
      name={name}
      render={({ field, form }: FieldProps) => {
        let input;
        if (type === 'icon') {
          input = <Icon form={form} {...field} {...props} />;
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
