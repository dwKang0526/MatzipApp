import {useEffect, useState} from 'react';

interface UseFormProps<T> {
  initialValues: T;
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({initialValues, validate}: UseFormProps<T>) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangeText = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handlerBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (text: string) => handleChangeText(name, text);
    const onBlur = () => handlerBlur(name);

    // console.log(value);

    return {value, onChangeText, onBlur};
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
  }, [validate, values]);

  return {values, errors, touched, getTextInputProps};
}

export default useForm;
