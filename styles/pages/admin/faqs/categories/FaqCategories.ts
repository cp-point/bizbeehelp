import styled, { css, keyframes } from 'styled-components';

const colors = {
    primaryWhite: '#ffffff',
    coolGrayBackground: '#f4f7f9',
    coolGray50: '#f8f9fb',
    coolGray100: '#eef1f6',
    coolGray150: '#e4e8ee',
    coolGray200: '#cdd3dd',
    coolGray400: '#8d99a8',
    coolGray600: '#414d5c',
    coolGray800: '#0f1b2a',
    green100: '#d1fadf',
    green300: '#6ce9a6',
    greenPrimary: '#16b364',
};

const control = css`
    width: 100%;
    height: 28px;
    padding: 0 10px;
    font-size: 13px;
    font-weight: 400;
    border: 1px solid ${colors.coolGray150};
    border-radius: 4px;
    outline: none;
    color: ${colors.coolGray800};
    background: ${colors.primaryWhite};

    &::placeholder {
        color: ${colors.coolGray400};
    }

    &:focus {
        border-color: ${colors.greenPrimary};
        box-shadow: 0 0 0 2px rgba(22, 179, 100, 0.12);
    }
`;

const toastEnter = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const FaqCategoriesPage = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    color: ${colors.coolGray800};
    background: ${colors.primaryWhite};

    button,
    input,
    select,
    textarea {
        font-family: inherit;
    }
`;

export const FaqCategoriesHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    background: ${colors.primaryWhite};
`;

export const FaqCategoriesTitle = styled.h1`
    display: flex;
    align-items: center;
    min-height: 56px;
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    color: ${colors.coolGray800};
`;

export const FaqCategoriesTabList = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${colors.coolGray150};
    overflow-x: auto;

    button {
        padding: 8px 24px 12px;
        font-size: 15px;
        font-weight: 500;
        border: 0;
        border-bottom: 2px solid transparent;
        line-height: normal;
        color: ${colors.coolGray600};
        background: ${colors.primaryWhite};
        cursor: pointer;
        white-space: nowrap;
    }

    button[data-active='true'] {
        border-bottom-color: ${colors.greenPrimary};
        color: ${colors.greenPrimary};
    }
`;

export const FaqCategoriesContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    padding: 16px 0 32px;
`;

export const FaqCategoriesSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const FaqCategoriesSectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    h2 {
        margin: 0;
        font-size: 17px;
        font-weight: 600;
        line-height: 1.4;
        color: ${colors.coolGray800};
    }

    @media (max-width: 640px) {
        align-items: flex-start;
        flex-direction: column;
    }
`;

export const FaqCategoriesButtonGroup = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;

    @media (max-width: 640px) {
        width: 100%;

        button {
            flex: 1;
        }
    }
`;

export const FaqCategoriesSearchGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    border-top: 1px solid ${colors.coolGray200};
    border-left: 1px solid ${colors.coolGray200};
    background: ${colors.primaryWhite};

    @media (max-width: 1180px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

export const FaqCategoriesField = styled.div`
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr);
    min-width: 0;
    border-right: 1px solid ${colors.coolGray200};
    border-bottom: 1px solid ${colors.coolGray200};

    @media (max-width: 760px) {
        grid-template-columns: 96px minmax(0, 1fr);
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

export const FaqCategoriesSearchLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    padding: 0 12px;
    font-size: 13px;
    font-weight: 500;
    border-right: 1px solid ${colors.coolGray200};
    text-align: right;
    color: ${colors.coolGray800};
    background: ${colors.coolGrayBackground};

    @media (max-width: 480px) {
        justify-content: flex-start;
        min-height: 34px;
        border-right: 0;
        border-bottom: 1px solid ${colors.coolGray200};
        text-align: left;
    }
`;

export const FaqCategoriesSearchControl = styled.div`
    display: flex;
    align-items: center;
    min-width: 0;
    padding: 8px;
`;

export const FaqCategoriesSelect = styled.select`
    ${control}
`;

export const FaqCategoriesTableScroll = styled.div`
    overflow-x: auto;
    overflow-y: auto;
    width: 100%;
    max-height: 930px;
    background: ${colors.coolGray50};

    &::-webkit-scrollbar {
        height: 12px;
    }

    &::-webkit-scrollbar-thumb {
        border: 4px solid transparent;
        border-radius: 999px;
        background: ${colors.coolGray200};
        background-clip: content-box;
    }
`;

export const FaqCategoriesDataTable = styled.table`
    width: 100%;
    min-width: 1376px;
    border-collapse: separate;
    border-spacing: 0;
    border-left: 1px solid ${colors.coolGray200};
    table-layout: fixed;

    thead {
        position: sticky;
        top: 0;
        z-index: 20;
    }

    th,
    td {
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 30px;
        padding: 0 8px;
        font-size: 13px;
        border-right: 1px solid ${colors.coolGray200};
        border-bottom: 1px solid ${colors.coolGray200};
        text-align: center;
    }

    th {
        position: sticky;
        top: 0;
        overflow: hidden;
        font-weight: 500;
        border-top: 1px solid ${colors.coolGray200};
        color: ${colors.coolGray800};
        background: ${colors.coolGrayBackground};
        z-index: 20;
    }

    td {
        overflow: hidden;
        color: ${colors.coolGray800};
        background: ${colors.primaryWhite};
    }

    td[data-align='left'] {
        text-align: left;
    }

    tr[data-selected='true'] td {
        background: ${colors.green100};
    }

    tr[data-selected='true'] td[data-active='true'] {
        background: ${colors.green300};
    }

    td[data-editable='true'][data-editing='true'] {
        background: ${colors.primaryWhite} !important;
    }
`;

export const FaqCategoriesCellInputBox = styled.div`
    width: 100%;
`;

export const FaqCategoriesEmptyCell = styled.td`
    padding: 320px 0 !important;
    font-size: 15px !important;
    font-weight: 500;
    text-align: center;
    color: ${colors.coolGray400} !important;
`;

export const FaqCategoriesToast = styled.div`
    display: flex;
    align-items: center;
    position: fixed;
    left: 252px;
    bottom: 32px;
    width: 320px;
    height: 64px;
    padding: 12px 32px;
    font-size: 16px;
    font-weight: 400;
    border-left: 6px solid ${colors.greenPrimary};
    border-radius: 4px;
    line-height: 1.4;
    color: ${colors.primaryWhite};
    background: ${colors.coolGray600};
    animation: ${toastEnter} 0.2s ease-out;
    z-index: 20;

    @media (max-width: 1024px) {
        left: 24px;
    }

    @media (max-width: 640px) {
        right: 12px;
        bottom: 16px;
        left: 12px;
        width: auto;
        height: auto;
        min-height: 56px;
        padding: 12px 18px;
        font-size: 14px;
    }
`;
