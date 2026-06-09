import styled from 'styled-components';

type RadioWrapperProps = {
    $margin?: string;
    $disabled?: boolean;
};

type RadioLabelProps = {
    $disabled?: boolean;
};

type RadioInputProps = {
    $size?: string;
    $color?: string;
    $border?: string;
};

export const RadioWrapper = styled.span<RadioWrapperProps>`
    display: inline-flex;
    margin: ${(props) => props.$margin};
    opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
`;

export const RadioLabel = styled.label<RadioLabelProps>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
    user-select: none;
`;

export const RadioInput = styled.input<RadioInputProps>`
    width: ${(props) => props.$size};
    height: ${(props) => props.$size};
    margin: 0;
    border: ${(props) => props.$border};
    border-radius: 50%;
    color: ${(props) => props.$color};
    cursor: inherit;
`;

export const RadioText = styled.span`
    color: #1f1f1f;
    font-size: 14px;
    line-height: 1.4;
`;
