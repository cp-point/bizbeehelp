import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

type LoadingWrapperProps = {
    $margin?: string;
    $fullScreen?: boolean;
};

type LoadingSpinnerProps = {
    $size?: string;
    $color?: string;
    $thickness?: string;
};

export const LoadingWrapper = styled.span<LoadingWrapperProps>`
    display: inline-flex;
    position: ${(props) => (props.$fullScreen ? 'fixed' : 'relative')};
    inset: ${(props) => (props.$fullScreen ? 0 : 'auto')};
    z-index: ${(props) => (props.$fullScreen ? 9999 : 'auto')};
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: ${(props) => props.$margin};
    background-color: ${(props) => (props.$fullScreen ? 'rgba(255, 255, 255, 0.72)' : 'transparent')};
`;

export const LoadingSpinner = styled.span<LoadingSpinnerProps>`
    width: ${(props) => props.$size};
    height: ${(props) => props.$size};
    border: ${(props) => props.$thickness} solid rgba(0, 0, 0, 0.12);
    border-top-color: ${(props) => props.$color};
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
`;

export const LoadingLabel = styled.span`
    color: #595959;
    font-size: 14px;
    line-height: 1.4;
`;
