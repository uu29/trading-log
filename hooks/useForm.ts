import React, { useState } from "react";

interface FormTypes<T> {
  initialForm: T;
}

export default function useForm<T>({ initialForm }: FormTypes<T>) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const initForm = () => {
    setForm(initialForm);
  };

  return { form, setForm, handleChange, initForm };
}
