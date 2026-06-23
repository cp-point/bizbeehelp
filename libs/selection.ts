export const toggleSelectedId = <T extends string | number>(selectedIds: T[], targetId: T) => {
    if (selectedIds.includes(targetId)) {
        return selectedIds.filter((selectedId) => selectedId !== targetId);
    }

    return [...selectedIds, targetId];
};

export function getLastSelectedId<T extends string | number>(selectedIds: T[], fallback: T): T;
export function getLastSelectedId<T extends string | number>(selectedIds: T[], fallback: null): T | null;
export function getLastSelectedId<T extends string | number>(selectedIds: T[], fallback: T | null) {
    return selectedIds.at(-1) ?? fallback;
}

export const getUniqueIds = <T extends string | number>(ids: T[]) => Array.from(new Set(ids));
