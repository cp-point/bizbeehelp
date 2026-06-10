import type { ChangeEventHandler, CSSProperties, FocusEventHandler, HTMLInputTypeAttribute } from 'react';

import { InputField, InputWrapper } from '../../styles/components/atom/Input';

export type InputProps = {
    type?: HTMLInputTypeAttribute;
    id?: string;
    name?: string;
    value?: string | number;
    defaultValue?: string | number;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
    style?: CSSProperties;
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    color?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    fontSize?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
};

const Input = ({
    type = 'text',
    id,
    name,
    value,
    defaultValue,
    placeholder,
    disabled = false,
    readOnly = false,
    autoFocus = false,
    maxLength,
    style,
    width = '100%',
    height = '36px',
    padding = '0 12px',
    margin,
    color = '#1f1f1f',
    backgroundColor = '#ffffff',
    border = '1px solid #d9d9d9',
    borderRadius = '6px',
    fontSize = '14px',
    onChange,
    onFocus,
    onBlur,
}: InputProps) => {
    return (
        <InputWrapper $width={width} $margin={margin} style={style}>
            <InputField
                type={type}
                id={id}
                name={name}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                autoFocus={autoFocus}
                maxLength={maxLength}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                $height={height}
                $padding={padding}
                $color={color}
                $backgroundColor={backgroundColor}
                $border={border}
                $borderRadius={borderRadius}
                $fontSize={fontSize}
            />
        </InputWrapper>
    );
};

export default Input;
