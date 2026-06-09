import type { ChangeEventHandler, CSSProperties, ReactNode } from 'react';

import { RadioInput, RadioLabel, RadioText, RadioWrapper } from '../../styles/components/atom/Radio';

export type RadioProps = {
    checked?: boolean;
    defaultChecked?: boolean;
    name?: string;
    value?: string | number;
    disabled?: boolean;
    label?: ReactNode;
    margin?: string;
    size?: string;
    color?: string;
    border?: string;
    style?: CSSProperties;
    onChange?: ChangeEventHandler<HTMLInputElement>;
};

const Radio = ({
    checked,
    defaultChecked,
    name,
    value,
    disabled = false,
    label,
    margin,
    size,
    color = 'black',
    border,
    style,
    onChange,
}: RadioProps) => {
    return (
        <RadioWrapper $margin={margin} $disabled={disabled} style={style}>
            <RadioLabel $disabled={disabled}>
                <RadioInput
                    type="radio"
                    checked={checked}
                    defaultChecked={defaultChecked}
                    name={name}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    $size={size}
                    $color={color}
                    $border={border}
                />
                {label ? <RadioText>{label}</RadioText> : null}
            </RadioLabel>
        </RadioWrapper>
    );
};

export default Radio;
