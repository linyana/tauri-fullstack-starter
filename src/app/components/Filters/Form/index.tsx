import {
  Form,
  type FormProps,
} from 'antd'

type FilterFormProps<T> = {
  setFilter: React.Dispatch<React.SetStateAction<T | any>>
  children: React.ReactNode
} & Omit<FormProps, 'onValuesChange'>

export const FilterForm = <T extends Record<string, any>>({
  setFilter,
  children,
  ...rest
}: FilterFormProps<T>) => {
  const [form] = Form.useForm<T>()

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={(_changed, allValues) => {
        setFilter((prev: T) => ({
          ...prev,
          ...allValues,
          offset: 0,
        }))
      }}
      {...rest}
    >
      {children}
    </Form>
  )
}
