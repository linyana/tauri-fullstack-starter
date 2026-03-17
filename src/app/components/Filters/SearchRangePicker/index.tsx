/* eslint-disable react/no-unstable-nested-components */
import {
  Form,
  type FormItemProps,
  DatePicker,
  Typography,
  type TimeRangePickerProps,
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
} & TimeRangePickerProps

const {
  Text,
} = Typography
const {
  RangePicker,
} = DatePicker

export const SearchRangePicker = ({
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
      <RangePicker
        allowClear={allowClear}
        style={{
          width: '100%',
        }}
        {...rest}
        value={null}
      />
    </Form.Item>
  )
}
