import { useState } from "react";

interface FormTypes<T> {
  initialValue: T;
  onSubmit: (form: T) => void;
}

export default function useForm<T>({ initialValue, onSubmit }: FormTypes<T>) {
  const [form, setForm] = useState(initialValue);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = () => {
    onSubmit(form);
  };
  return { form, handleChange, handleSubmit };
}
