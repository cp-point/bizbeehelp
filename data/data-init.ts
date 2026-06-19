import { AdminMenuGroup, AdminMenuLabel, AdminMenuPath } from '../enum/NavBar';

export const menuGroups = [
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
            {
                label: AdminMenuLabel.FAQ_CATEGORY,
                href: AdminMenuPath.FAQ_CATEGORY,
            },
        ],
    },
];