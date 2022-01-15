import React, { useState } from "react";

interface FormTypes<T> {
  initialValue: T;
}

export default function useForm<T>({ initialValue }: FormTypes<T>) {
  const [form, setForm] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const initForm = () => {
    setForm(initialValue);
  };

  return { form, handleChange, initForm };
}
