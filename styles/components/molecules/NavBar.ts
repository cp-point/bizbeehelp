import Link from 'next/link';
import styled from 'styled-components';

type NavMenuLinkProps = {
    $isActive?: boolean;
};

export const NavBarWrapper = styled.aside`
    position: sticky;
    top: 64px;
    display: flex;
    flex-direction: column;
    flex: 0 0 220px;
    min-width: 220px;
    height: calc(100vh - 64px);
    padding: 40px 10px 24px;
    background: #1e293b;
    z-index: 10;

    @media (max-width: 1024px) {
        top: 64px;
        flex: 0 0 auto;
        min-width: 0;
        width: 100%;
        height: auto;
        padding: 8px 16px;
        overflow-x: auto;

        &::-webkit-scrollbar {
            height: 8px;
        }

        &::-webkit-scrollbar-thumb {
            border: 3px solid transparent;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.35);
            background-clip: content-box;
        }
    }

    @media (max-width: 640px) {
        top: 64px;
        padding: 8px 12px;
    }
`;

export const NavMenuArea = styled.nav`
    flex: 1;
`;

export const NavMenuList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 4px;
    list-style: none;

    @media (max-width: 1024px) {
        flex-direction: row;
        width: max-content;
        min-width: 100%;
    }
`;

export const NavMenuItem = styled.li`
    margin-bottom: 4px;

    @media (max-width: 1024px) {
        margin-bottom: 0;
    }
`;

export const NavMenuLink = styled(Link)<NavMenuLinkProps>`
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 4px;
    padding: 10px;
    color: #ffffff;
    background: ${(props) => (props.$isActive ? 'rgba(129, 217, 255, 0.1)' : 'transparent')};
    font-size: 17px;
    font-weight: ${(props) => (props.$isActive ? 600 : 500)};
    line-height: 1.4;
    text-decoration: none;

    &:hover {
        color: #ffffff;
        background: rgba(129, 217, 255, 0.1);
    }

    @media (max-width: 1024px) {
        justify-content: center;
        min-width: max-content;
        padding: 9px 12px;
        font-size: 14px;
    }
`;
