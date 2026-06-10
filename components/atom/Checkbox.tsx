import type { ChangeEventHandler, CSSProperties, ReactNode } from 'react';

import { CheckboxInput, CheckboxLabel, CheckboxText, CheckboxWrapper } from '../../styles/components/atom/Checkbox';

export type CheckboxProps = {
    checked?: boolean;
    defaultChecked?: boolean;
    name?: string;
    value?: string | number;
    disabled?: boolean;
    readOnly?: boolean;
    label?: ReactNode;
    margin?: string;
    size?: string;
    color?: string;
    border?: string;
    borderRadius?: string;
    style?: CSSProperties;
    onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox = ({
    checked,
    defaultChecked,
    name,
    value,
    disabled = false,
    readOnly = false,
    label,
    margin,
    size = '16px',
    color = '#1677ff',
    border = '1px solid #d9d9d9',
    borderRadius = '4px',
    style,
    onChange,
}: CheckboxProps) => {
    return (
        <CheckboxWrapper $margin={margin} $disabled={disabled} style={style}>
            <CheckboxLabel $disabled={disabled}>
                <CheckboxInput
                    type="checkbox"
                    checked={checked}
                    defaultChecked={defaultChecked}
                    name={name}
                    value={value}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={onChange}
                    $size={size}
                    $color={color}
                    $border={border}
                    $borderRadius={borderRadius}
                />
                {label ? <CheckboxText>{label}</CheckboxText> : null}
            </CheckboxLabel>
        </CheckboxWrapper>
    );
};

export default Checkbox;
