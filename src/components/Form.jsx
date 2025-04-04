import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from './Button';

const Form = ({ schema, onSubmit, buttonText, children }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      {children(register, errors)}
      <Button type="submit" className="btn-primary mt-3">
        {buttonText}
      </Button>
    </form>
  );
};

export default Form;
