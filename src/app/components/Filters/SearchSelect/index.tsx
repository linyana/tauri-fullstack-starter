/* eslint-disable react/no-unstable-nested-components */
import {
  Form,
  type FormItemProps,
  Select,
  type SelectProps,
  Typography,
} from 'antd'
import {
  useMobile,
} from '@/hooks'

type ILabelProps = FormItemProps & {
  isLabelStrong?: boolean
}

type IPropsType = {
  allowClear?: boolean
  formItemProps?: ILabelProps
} & SelectProps

const {
  Text,
} = Typography

export const SearchSelect = ({
  allowClear = true,
  formItemProps = {},
  ...rest
}: IPropsType) => {
  const isMobile = useMobile()

  const {
    name,
    label,
    isLabelStrong = true,
    ...restFormItemProps
  } = formItemProps

  return (
    <Form.Item
      name={name}
      label={label ? <Text strong={isLabelStrong}>{label}</Text> : undefined}
      style={{
        flex: isMobile ? '1' : '1',
        minWidth: 200,
      }}
      {...restFormItemProps}
    >
      <Select
        allowClear={allowClear}
        style={{
          width: '100%',
        }}
        optionLabelProp="label"
        {...rest}
      />
    </Form.Item>
  )
}
