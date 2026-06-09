import { create } from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export type User = {
    memberId: string;
    userId: string;
    username: string;
    role: string;
};

interface UserState {
    userData: User | null;
    setUserData: (userData: User) => void;
    reset: () => void;
}

export const userStore = create(
    persist<UserState>(
        (set) => ({
            userData: null,
            setUserData: (newUser) => {
                set({ userData: newUser });
            },
            reset: () => set({ userData: null }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
