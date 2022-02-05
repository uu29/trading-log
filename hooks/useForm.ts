import React, { useState, useEffect, HTMLInputTypeAttribute } from "react";

interface FormTypes<T> {
  initialForm: T;
  changeFormCb?: (form: T) => void;
}

export default function useForm<T>({ initialForm, changeFormCb }: FormTypes<T>) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  useEffect(() => {
    if (changeFormCb) changeFormCb(form);
  }, [form, changeFormCb]);

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setForm({ ...form, [name]: checked });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const updateForm = (obj: any) => {
    setForm({ ...form, ...obj });
  };

  const initForm = () => {
    setForm(initialForm);
  };

  return { form, updateForm, handleChange, handleChangeCheckbox, initForm };
}
