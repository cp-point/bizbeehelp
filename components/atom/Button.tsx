import { ButtonHTMLAttributes, CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { ButtonWrapper } from '../../styles/components/atom/Button';

export type ButtonProps = {
    children: ReactNode;
    style?: CSSProperties;
    ariaLabel?: string;
    width?: string;
    height?: string;
    color?: string;
    activeColor?: string;
    backgroundColor?: string;
    activeBackgroundColor?: string;
    padding?: string;
    margin?: string;
    gap?: string;
    fontSize?: string;
    display?: string;
    isActive?: boolean;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
    onClick?: MouseEventHandler<HTMLButtonElement>;
    border?: string;
    borderRadius?: string;
    shadow?: string;
};

const Button = ({
    children,
    style,
    ariaLabel,
    width,
    height,
    color = 'black',
    activeColor,
    backgroundColor,
    activeBackgroundColor,
    padding = '5px 10px',
    margin,
    gap,
    fontSize,
    display,
    isActive,
    type = 'button',
    onClick,
    border,
    borderRadius = '10px',
    shadow = '2px 2px 1px rgba(0, 0, 0, 0.05)',
}: ButtonProps) => {
    return (
        <ButtonWrapper
            style={style}
            $width={width}
            $height={height}
            $color={color}
            $activeColor={activeColor}
            $backgroundColor={backgroundColor}
            $activeBackgroundColor={activeBackgroundColor}
            $display={display}
            $margin={margin}
            $gap={gap}
            $fontSize={fontSize}
            $padding={padding}
            $isActive={isActive}
            type={type}
            onClick={onClick}
            aria-label={ariaLabel}
            $border={border}
            $borderRadius={borderRadius}
            $shadow={shadow}
        >
            {children}
        </ButtonWrapper>
    );
};
export default Button;
