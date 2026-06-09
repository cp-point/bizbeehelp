import styled from 'styled-components';

type TextareaWrapperProps = {
    $width?: string;
    $margin?: string;
};

type TextareaFieldProps = {
    $height?: string;
    $padding?: string;
    $color?: string;
    $backgroundColor?: string;
    $border?: string;
    $borderRadius?: string;
    $fontSize?: string;
    $resize?: string;
};

export const TextareaWrapper = styled.div<TextareaWrapperProps>`
    display: flex;
    width: ${(props) => props.$width};
    margin: ${(props) => props.$margin};
`;

export const TextareaField = styled.textarea<TextareaFieldProps>`
    width: 100%;
    height: ${(props) => props.$height};
    padding: ${(props) => props.$padding};
    color: ${(props) => props.$color};
    background-color: ${(props) => props.$backgroundColor};
    border: ${(props) => props.$border};
    border-radius: ${(props) => props.$borderRadius};
    font-size: ${(props) => props.$fontSize};
    resize: ${(props) => props.$resize};
    line-height: 1.5;
    outline: none;
    transition:
        border-color 0.2s,
        box-shadow 0.2s,
        background-color 0.2s;

    &::placeholder {
        color: #bfbfbf;
    }

    &:focus {
        border-color: #1677ff;
        box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.12);
    }

    &:disabled {
        color: #8c8c8c;
        background-color: #f5f5f5;
        cursor: not-allowed;
    }

    &[readonly] {
        background-color: #fafafa;
    }
`;
