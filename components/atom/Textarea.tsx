import type { ChangeEventHandler, CSSProperties, FocusEventHandler } from 'react';

import { TextareaField, TextareaWrapper } from '../../styles/components/atom/Textarea';

export type TextareaProps = {
    name?: string;
    value?: string | number;
    defaultValue?: string | number;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
    rows?: number;
    cols?: number;
    resize?: 'none' | 'both' | 'horizontal' | 'vertical';
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
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    onFocus?: FocusEventHandler<HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
};

const Textarea = ({
    name,
    value,
    defaultValue,
    placeholder,
    disabled = false,
    readOnly = false,
    autoFocus = false,
    maxLength,
    rows = 4,
    cols,
    resize = 'vertical',
    style,
    width = '100%',
    height = 'auto',
    padding = '8px 12px',
    margin,
    color = '#1f1f1f',
    backgroundColor = '#ffffff',
    border = '1px solid #d9d9d9',
    borderRadius = '6px',
    fontSize = '14px',
    onChange,
    onFocus,
    onBlur,
}: TextareaProps) => {
    return (
        <TextareaWrapper $width={width} $margin={margin} style={style}>
            <TextareaField
                name={name}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                autoFocus={autoFocus}
                maxLength={maxLength}
                rows={rows}
                cols={cols}
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
                $resize={resize}
            />
        </TextareaWrapper>
    );
};

export default Textarea;
