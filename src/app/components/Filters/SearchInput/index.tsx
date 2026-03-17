import {
  Form,
  type FormItemProps,
  Input,
  type InputProps,
  Typography,
} from 'antd'
import {
  SearchOutlined,
} from '@ant-design/icons'
import {
  useMobile,
} from '@/hooks'

type ILabelProps = FormItemProps & {
  isLabelStrong?: boolean
}

type IPropsType = InputProps & {
  formItemProps?: ILabelProps
  onSearch?: () => void
}

const {
  Text,
} = Typography

export const SearchInput = ({
  allowClear = true,
  onSearch,
  formItemProps = {},
  ...rest
}: IPropsType) => {
  const isMobile = useMobile()

  const inputNode = (
    <Input
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSearch?.()
      }}
      prefix={(
        <SearchOutlined
          style={{
            cursor: 'pointer',
          }}
          onClick={onSearch}
        />
      )}
      style={{
        width: '100%',
      }}
      allowClear={allowClear}
      {...rest}
    />
  )

  const {
    label = 'Search',
    isLabelStrong = true,
    ...restFormItemProps
  } = formItemProps

  return (
    <Form.Item
      name="keyword"
      label={(
        <Text
          strong={isLabelStrong}
        >
          {label}
        </Text>
      )}
      style={{
        flex: isMobile ? '1' : '2',
        minWidth: 200,
      }}
      {...restFormItemProps}
    >
      {inputNode}
    </Form.Item>
  )
}
