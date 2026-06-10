import styled from 'styled-components';

type CheckboxWrapperProps = {
    $margin?: string;
    $disabled?: boolean;
};

type CheckboxLabelProps = {
    $disabled?: boolean;
};

type CheckboxInputProps = {
    $size?: string;
    $color?: string;
    $border?: string;
    $borderRadius?: string;
};

export const CheckboxWrapper = styled.span<CheckboxWrapperProps>`
    display: inline-flex;
    margin: ${(props) => props.$margin};
    opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
`;

export const CheckboxLabel = styled.label<CheckboxLabelProps>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
    user-select: none;
`;

export const CheckboxInput = styled.input<CheckboxInputProps>`
    position: relative;
    appearance: none;
    width: ${(props) => props.$size};
    height: ${(props) => props.$size};
    margin: 0;
    border: ${(props) => props.$border};
    border-radius: ${(props) => props.$borderRadius};
    background-color: #ffffff;
    cursor: inherit;

    &:checked {
        border-color: ${(props) => props.$color};
        background-color: ${(props) => props.$color};
    }

    &:checked::after {
        content: '';
        position: absolute;
        top: 45%;
        left: 50%;
        width: 4px;
        height: 8px;
        border: solid #ffffff;
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) rotate(45deg);
    }

    &:focus-visible {
        outline: 2px solid rgba(22, 119, 255, 0.25);
        outline-offset: 2px;
    }
`;

export const CheckboxText = styled.span`
    color: #1f1f1f;
    font-size: 14px;
    line-height: 1.4;
`;
