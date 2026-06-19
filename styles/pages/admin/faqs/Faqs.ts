import styled, { css } from 'styled-components';

type FaqsFieldProps = {
    $wide?: 'large';
};

const colors = {
    primaryWhite: '#ffffff',
    coolGrayBackground: '#f4f7f9',
    coolGray100: '#eef1f6',
    coolGray150: '#e4e8ee',
    coolGray200: '#cdd3dd',
    coolGray600: '#414d5c',
    coolGray800: '#0f1b2a',
    greenPrimary: '#16b364',
};

export const FaqsPage = styled.main`
    display: flex;
    flex-direction: column;
    gap: 24px;
    min-width: 1254px;
    width: 100%;
    color: ${colors.coolGray800};
    background: ${colors.primaryWhite};
`;

export const FaqsHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 56px;
`;

export const FaqsTitle = styled.h1`
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    color: ${colors.coolGray800};
`;

export const FaqsAddLink = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    padding: 11px 16px;
    font-size: 15px;
    font-weight: 500;
    border: 1px solid ${colors.greenPrimary};
    border-radius: 4px;
    line-height: 16px;
    text-decoration: none;
    color: ${colors.primaryWhite};
    background: ${colors.greenPrimary};
    transition:
        border-color 0.2s,
        background-color 0.2s;

    &:hover {
        border-color: #039855;
        background: #039855;
    }
`;

export const FaqsSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const FaqsSectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
        margin: 0;
        font-size: 17px;
        font-weight: 600;
        line-height: 1.4;
        color: ${colors.coolGray800};
    }
`;

export const FaqsButtonGroup = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
`;

export const FaqsForm = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-top: 1px solid ${colors.coolGray200};
    border-left: 1px solid ${colors.coolGray200};
    background: ${colors.primaryWhite};
`;

export const FaqsField = styled.div<FaqsFieldProps>`
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr);
    min-width: 0;
    border-right: 1px solid ${colors.coolGray200};
    border-bottom: 1px solid ${colors.coolGray200};

    ${(props) =>
        props.$wide === 'large' &&
        css`
            grid-column: span 2;
        `}
`;

export const FaqsLabel = styled.label`
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
`;

export const FaqsDateRange = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    padding: 8px;
`;

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
    background-color: ${colors.primaryWhite};

    &:focus {
        border-color: ${colors.greenPrimary};
        box-shadow: 0 0 0 2px rgba(22, 179, 100, 0.12);
    }
`;

export const FaqsDateInput = styled.input`
    ${control}
    position: relative;
    min-width: 0;
    padding-right: 34px;
    background-image: url('/assets/images/admin-calendar.svg');
    background-position: right 8px center;
    background-repeat: no-repeat;
    background-size: 16px 16px;

    &::-webkit-calendar-picker-indicator {
        position: absolute;
        right: 8px;
        width: 16px;
        height: 16px;
        opacity: 0;
        cursor: pointer;
    }
`;

export const FaqsDateDivider = styled.span`
    font-size: 12px;
    line-height: 1;
    color: ${colors.coolGray600};
`;

export const FaqsSelectBox = styled.div`
    position: relative;
    width: calc(100% - 16px);
    margin: 8px;

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 10px;
        width: 16px;
        height: 16px;
        background: currentColor;
        mask: url('/assets/images/admin-chevron-down.svg') center / 16px 16px no-repeat;
        pointer-events: none;
        transform: translateY(-50%);
    }
`;

export const FaqsSelect = styled.select`
    ${control}
    appearance: none;
    padding-right: 34px;
    cursor: pointer;
`;

export const FaqsTableLink = styled.button`
    display: inline-block;
    max-width: 100%;
    padding: 0;
    overflow: hidden;
    font: inherit;
    border: 0;
    text-decoration: underline;
    text-underline-offset: 2px;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: inherit;
    background: transparent;
    cursor: pointer;
`;
