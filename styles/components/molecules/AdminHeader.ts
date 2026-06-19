import Link from 'next/link';
import styled from 'styled-components';

type AdminHeaderButtonProps = {
    $variant: 'line' | 'sub';
};

const colors = {
    primaryWhite: '#ffffff',
    coolGray50: '#f8f9fb',
    coolGray200: '#cdd3dd',
    coolGray800: '#0f1b2a',
    green50: '#ecfdf3',
    green600: '#039855',
    greenPrimary: '#16b364',
};

export const AdminHeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    height: 64px;
    padding: 0 32px;
    border-bottom: 1px solid ${colors.coolGray200};
    background: ${colors.primaryWhite};
    z-index: 99;
`;

export const AdminHeaderLogo = styled(Link)`
    display: inline-flex;
    align-items: center;

    img {
        display: block;
    }
`;

export const AdminHeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const AdminHeaderButton = styled(Link)<AdminHeaderButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 11px 16px;
    font-size: 15px;
    font-weight: 500;
    border: 1px solid ${(props) => (props.$variant === 'line' ? colors.greenPrimary : colors.coolGray200)};
    border-radius: 4px;
    line-height: 16px;
    text-decoration: none;
    color: ${(props) => (props.$variant === 'line' ? colors.greenPrimary : colors.coolGray800)};
    background: ${colors.primaryWhite};
    transition:
        border-color 0.2s,
        color 0.2s,
        background-color 0.2s;

    &:hover {
        border-color: ${(props) => (props.$variant === 'line' ? colors.green600 : colors.coolGray200)};
        color: ${(props) => (props.$variant === 'line' ? colors.greenPrimary : colors.coolGray800)};
        background: ${(props) => (props.$variant === 'line' ? colors.green50 : colors.coolGray50)};
    }
`;
