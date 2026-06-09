'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminMenuGroup, AdminMenuLabel, AdminMenuPath } from '../../enum/NavBar';
import {
    NavBarWrapper,
    NavGroup,
    NavGroupButton,
    NavGroupTitle,
    NavMenuItem,
    NavMenuLink,
    NavMenuList,
} from '../../styles/components/molecules/NavBar';

const menuGroups = [
    {
        title: AdminMenuGroup.FAQ_CATEGORY,
        items: [
            {
                label: AdminMenuLabel.FAQ_CATEGORY,
                href: AdminMenuPath.FAQ_CATEGORY,
            },
        ],
    },
    {
        title: AdminMenuGroup.FAQ,
        items: [
            {
                label: AdminMenuLabel.FAQ_LIST,
                href: AdminMenuPath.FAQ_LIST,
            },
            {
                label: AdminMenuLabel.FAQ_REGISTER,
                href: AdminMenuPath.FAQ_REGISTER,
            },
        ],
    },
    {
        title: AdminMenuGroup.PAGE_INFO,
        items: [
            {
                label: AdminMenuLabel.PAGE_INFO,
                href: AdminMenuPath.PAGE_INFO,
            },
        ],
    },
];

const NavBar = () => {
    const pathname = usePathname();
    const [openedGroup, setOpenedGroup] = useState<AdminMenuGroup | null>(null);

    const handleGroupClick = (groupTitle: AdminMenuGroup) => {
        setOpenedGroup((prevGroup) => (prevGroup === groupTitle ? null : groupTitle));
    };

    return (
        <NavBarWrapper>
            <nav aria-label="관리자 메뉴">
                {menuGroups.map((group) => (
                    <NavGroup key={group.title}>
                        <NavGroupButton
                            type="button"
                            onClick={() => handleGroupClick(group.title)}
                            aria-expanded={openedGroup === group.title}
                        >
                            <NavGroupTitle>{group.title}</NavGroupTitle>
                        </NavGroupButton>
                        <NavMenuList $isOpen={openedGroup === group.title}>
                            {group.items.map((item) => {
                                const isActive = pathname === item.href;

                                return (
                                    <NavMenuItem key={item.href}>
                                        <NavMenuLink
                                            href={item.href}
                                            $isActive={isActive}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            {item.label}
                                        </NavMenuLink>
                                    </NavMenuItem>
                                );
                            })}
                        </NavMenuList>
                    </NavGroup>
                ))}
            </nav>
        </NavBarWrapper>
    );
};

export default NavBar;
