import { useState } from "react";

interface FormTypes<T> {
  initialValue: T;
}

export default function useForm<T>({ initialValue }: FormTypes<T>) {
  const [form, setForm] = useState(initialValue);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  
  return { form, handleChange };
}
