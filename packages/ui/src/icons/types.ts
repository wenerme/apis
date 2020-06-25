import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';

export type IconProps = Omit<IconComponentProps, 'css'>// & Partial<Pick<IconComponentProps, 'css'>>
