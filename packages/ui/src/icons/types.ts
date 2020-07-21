import type { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import Icon from '@ant-design/icons';

// FIXME systemjs import umd cause Icon.default is the real component
export const IconComponent = Icon['default'] || Icon;
export type IconProps = Omit<IconComponentProps, 'css'>; // & Partial<Pick<IconComponentProps, 'css'>>
