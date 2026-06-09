import styled from "styled-components";

type ButtonProps = {
    $width?: string;
    $height?: string;
    $color?: string;
    $activeColor?: string;
    $isActive?: boolean;
    $backgroundColor?: string;
    $activeBackgroundColor?: string;
    $padding?: string;
    $margin?: string;
    $gap?: string;
    $fontSize?: string;
    $display?: string;
    $border?: string;
    $borderRadius?: string;
    $shadow?: string;
}

export const ButtonWrapper = styled.button<ButtonProps>`
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    color: ${(props) => (props.$isActive ? props.$activeColor : props.$color)};
    background-color: ${(props) => (props.$isActive ? props.$activeBackgroundColor : props.$backgroundColor)};
    padding: ${(props) => props.$padding};
    margin: ${(props) => props.$margin};
    gap: ${(props) => props.$gap};
    font-size: ${(props) => props.$fontSize};
    display: ${(props) => (props.$display ? props.$display : 'flex')};
    border: ${(props) => props.$border};
    border-radius: ${(props) => props.$borderRadius};
    box-shadow: ${(props) => props.$shadow};
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    overflow: hidden;

    &:hover {
        transform: translateY(-2px);
    }
`;