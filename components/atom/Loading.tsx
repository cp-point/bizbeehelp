import type { CSSProperties, ReactNode } from 'react';

import { LoadingLabel, LoadingSpinner, LoadingWrapper } from '../../styles/components/atom/Loading';

export type LoadingProps = {
    label?: ReactNode;
    size?: string;
    color?: string;
    thickness?: string;
    margin?: string;
    fullScreen?: boolean;
    style?: CSSProperties;
};

const Loading = ({ label, size = '32px', color = '#1677ff', thickness = '3px', margin, fullScreen = false, style }: LoadingProps) => {
    return (
        <LoadingWrapper role="status" aria-live="polite" $margin={margin} $fullScreen={fullScreen} style={style}>
            <LoadingSpinner aria-hidden="true" $size={size} $color={color} $thickness={thickness} />
            {label ? <LoadingLabel>{label}</LoadingLabel> : null}
        </LoadingWrapper>
    );
};

export default Loading;
