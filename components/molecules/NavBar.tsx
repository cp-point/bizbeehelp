'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminMenuGroup } from '../../enum/NavBar';
import {
    LogoutButton,
    LogoutButtonArea,
    NavBarWrapper,
    NavGroup,
    NavGroupButton,
    NavGroupTitle,
    NavMenuArea,
    NavMenuItem,
    NavMenuLink,
    NavMenuList,
} from '../../styles/components/molecules/NavBar';
import { menuGroups } from '../../data/data-init';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Post } from '../../service/crud';

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

    const handleClickLogout = () => {
        Post(
            '/admin/logout',
            {},
            (response) => {
                if (response.type === 'SUCCESS') {
                    window.location.href = '/admin/login';
                    return;
                }

                alert(response.message || '로그아웃에 실패했습니다.');
            },
            false,
        );
    };

    return (
        <NavBarWrapper>
            <NavMenuArea aria-label="관리자 메뉴">
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
            </NavMenuArea>
            <LogoutButtonArea>
                <LogoutButton type="button" onClick={handleClickLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </LogoutButton>
            </LogoutButtonArea>
        </NavBarWrapper>
    );
};

export default NavBar;
