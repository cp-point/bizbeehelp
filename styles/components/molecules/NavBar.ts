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
`;

export const NavMenuArea = styled.nav`
    flex: 1;
`;

export const NavMenuList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 4px;
    list-style: none;
`;

export const NavMenuItem = styled.li`
    margin-bottom: 4px;
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
`;
