import { useState } from "react"

export const useForm = (callback: any, initialState: any) => {
  const [values, setValues] = useState<typeof initialState>(initialState)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    //resetForm()
    await callback()
  };

  const resetForm = () => {
    setValues(initialState)
  }

  return {
    onChange,
    onSubmit,
    values,
    resetForm,
  };

}

