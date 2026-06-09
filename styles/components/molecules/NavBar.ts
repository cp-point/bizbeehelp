import Link from 'next/link';
import styled from 'styled-components';

type NavMenuLinkProps = {
    $isActive?: boolean;
};

type NavMenuListProps = {
    $isOpen?: boolean;
};

export const NavBarWrapper = styled.aside`
    flex: 0 0 220px;
    min-height: 100vh;
    border-right: 1px solid #d9dde3;
    background-color: #f5f6f8;
    padding: 24px 16px;

    @media (max-width: 768px) {
        flex-basis: auto;
        min-height: auto;
        border-right: 0;
        border-bottom: 1px solid #d9dde3;
        padding: 16px;
    }
`;

export const NavGroup = styled.section`
    margin-bottom: 28px;

    @media (max-width: 768px) {
        margin-bottom: 16px;
    }
`;

export const NavGroupButton = styled.button`
    display: flex;
    width: 100%;
    border: 0;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    text-align: left;
`;

export const NavGroupTitle = styled.h2`
    margin-bottom: 8px;
    color: #1f2937;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.4;
`;

export const NavMenuList = styled.ul<NavMenuListProps>`
    list-style: none;
    max-height: ${(props) => (props.$isOpen ? '160px' : '0')};
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    overflow: hidden;
    transition:
        max-height 0.8s ease,
        opacity 0.6s ease;
`;

export const NavMenuItem = styled.li`
    margin-bottom: 4px;
`;

export const NavMenuLink = styled(Link)<NavMenuLinkProps>`
    display: block;
    width: 100%;
    border-radius: 6px;
    padding: 8px 10px;
    color: ${(props) => (props.$isActive ? '#1d4ed8' : '#4b5563')};
    background-color: ${(props) => (props.$isActive ? '#dbeafe' : 'transparent')};
    font-size: 14px;
    font-weight: ${(props) => (props.$isActive ? 700 : 400)};
    line-height: 1.4;

    &:hover {
        background-color: #e7eaf0;
        color: #111827;
    }
`;
