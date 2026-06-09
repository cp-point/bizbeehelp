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
    width: ${(props) => props.$size};
    height: ${(props) => props.$size};
    margin: 0;
    border: ${(props) => props.$border};
    border-radius: ${(props) => props.$borderRadius};
    accent-color: ${(props) => props.$color};
    cursor: inherit;
`;

export const CheckboxText = styled.span`
    color: #1f1f1f;
    font-size: 14px;
    line-height: 1.4;
`;
