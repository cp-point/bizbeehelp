'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminMenuGroup } from '../../enum/NavBar';
import {
    NavBarWrapper,
    NavGroup,
    NavGroupButton,
    NavGroupTitle,
    NavMenuItem,
    NavMenuLink,
    NavMenuList,
} from '../../styles/components/molecules/NavBar';
import { menuGroups } from '../../data/data-init';


const NavBar = () => {
    const pathname = usePathname();
    const activeGroup = useMemo(() => {
        return menuGroups.find((group) => group.items.some((item) => item.href === pathname))?.title ?? null;
    }, [pathname]);
    const [openedGroup, setOpenedGroup] = useState<AdminMenuGroup | null | undefined>(undefined);
    const currentOpenedGroup = openedGroup === undefined ? activeGroup : openedGroup;

    const handleGroupClick = (groupTitle: AdminMenuGroup) => {
        setOpenedGroup((prevGroup) => {
            const nextOpenedGroup = prevGroup === undefined ? activeGroup : prevGroup;

            return nextOpenedGroup === groupTitle ? null : groupTitle;
        });
    };

    return (
        <NavBarWrapper>
            <nav aria-label="관리자 메뉴">
                {menuGroups.map((group) => (
                    <NavGroup key={group.title}>
                        <NavGroupButton
                            type="button"
                            onClick={() => handleGroupClick(group.title)}
                            aria-expanded={currentOpenedGroup === group.title}
                        >
                            <NavGroupTitle>{group.title}</NavGroupTitle>
                        </NavGroupButton>
                        <NavMenuList $isOpen={currentOpenedGroup === group.title}>
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
