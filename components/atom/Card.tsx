import type { CSSProperties, ReactNode } from 'react';

import { CardBody, CardHeader, CardTitle, CardWrapper } from '../../styles/components/atom/Card';

type CardProps = {
    children: ReactNode;
    title?: ReactNode;
    style?: CSSProperties;
    width?: string;
    minHeight?: string;
    padding?: string;
    margin?: string;
    gap?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    shadow?: string;
};

const Card = ({
    children,
    title,
    style,
    width = '100%',
    minHeight,
    padding = '16px',
    margin,
    gap = '12px',
    backgroundColor = '#ffffff',
    border = '1px solid #f0f0f0',
    borderRadius = '8px',
    shadow = '0 2px 8px rgba(0, 0, 0, 0.06)',
}: CardProps) => {
    const hasHeader = Boolean(title);

    return (
        <CardWrapper
            style={style}
            $width={width}
            $minHeight={minHeight}
            $padding={padding}
            $margin={margin}
            $gap={gap}
            $backgroundColor={backgroundColor}
            $border={border}
            $borderRadius={borderRadius}
            $shadow={shadow}
        >
            {hasHeader ? <CardHeader>{title ? <CardTitle>{title}</CardTitle> : null}</CardHeader> : null}
            <CardBody>{children}</CardBody>
        </CardWrapper>
    );
};

export default Card;
