import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetError,
  FieldError,
} from "react-hook-form";
import { ChangeEvent, FocusEvent } from "react";

interface FormFieldWrapperProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  error?: string;
  register: UseFormRegister<T>;
  setError: UseFormSetError<T>;
  Component: React.ComponentType<{
    label: string;
    error?: string;
    name: string;
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  }>;
}

export function FormFieldWrapper<T extends FieldValues>({
  name,
  label,
  error,
  register,
  setError,
  Component,
}: FormFieldWrapperProps<T>) {
  const { onChange, onBlur, ref, name: fieldName } = register(name);

  return (
    <Component
      label={label}
      name={fieldName}
      error={error}
      onChange={(e) => {
        if (error) {
          setError(name, { message: "" } as FieldError);
        }
        onChange(e);
      }}
      onBlur={onBlur}
      ref={ref}
    />
  );
}
