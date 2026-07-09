'use client';

import { usePathname } from 'next/navigation';
import {
    NavBarWrapper,
    NavMenuArea,
    NavMenuItem,
    NavMenuLink,
    NavMenuList,
} from '../../styles/components/molecules/NavBar';
import { menuGroups } from '../../data/data-init';

const NavBar = () => {
    const pathname = usePathname();
    const menuItems = menuGroups.flatMap((group) => group.items);

    return (
        <NavBarWrapper>
            <NavMenuArea aria-label="관리자 메뉴">
                <NavMenuList>
                    {menuItems.map((item) => {
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
            </NavMenuArea>
        </NavBarWrapper>
    );
};

export default NavBar;
