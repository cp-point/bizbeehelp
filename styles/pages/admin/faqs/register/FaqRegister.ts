import styled, { css } from 'styled-components';

type FaqRegisterButtonProps = {
    $variant: 'solid' | 'sub' | 'line' | 'del';
    $size: 'small' | 'large';
};

type FaqRegisterFormCellProps = {
    $span?: 'wide' | 'full';
};

const colors = {
    primaryWhite: '#ffffff',
    coolGrayBackground: '#f4f7f9',
    coolGray50: '#f8f9fb',
    coolGray150: '#e4e8ee',
    coolGray200: '#cdd3dd',
    coolGray400: '#8d99a8',
    coolGray800: '#0f1b2a',
    green50: '#ecfdf3',
    green600: '#039855',
    greenPrimary: '#16b364',
    red500: '#f04438',
};

const control = css`
    width: calc(100% - 16px);
    height: 28px;
    margin: 8px;
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

    &:disabled,
    &:read-only {
        color: ${colors.coolGray800};
        background: ${colors.primaryWhite};
    }
`;

const buttonSize = {
    small: css`
        padding: 8px 12px;
        font-size: 13px;
        font-weight: 400;
        line-height: 14px;
    `,
    large: css`
        padding: 11px 16px;
        font-size: 15px;
        font-weight: 500;
        line-height: 16px;
    `,
};

const buttonVariant = {
    solid: css`
        border-color: ${colors.greenPrimary};
        color: ${colors.primaryWhite};
        background: ${colors.greenPrimary};

        &:hover {
            border-color: ${colors.green600};
            background: ${colors.green600};
        }
    `,
    sub: css`
        border-color: ${colors.coolGray200};
        color: ${colors.coolGray800};
        background: ${colors.primaryWhite};

        &:hover {
            background: ${colors.coolGray50};
        }
    `,
    line: css`
        border-color: ${colors.greenPrimary};
        color: ${colors.greenPrimary};
        background: ${colors.primaryWhite};

        &:hover {
            background: ${colors.green50};
        }
    `,
    del: css`
        border-color: ${colors.red500};
        color: ${colors.red500};
        background: ${colors.primaryWhite};

        &:hover {
            background: ${colors.coolGray50};
        }
    `,
};

export const FaqRegisterPage = styled.main`
    display: flex;
    flex-direction: column;
    gap: 24px;
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

export const FaqRegisterHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    min-height: 56px;

    @media (max-width: 640px) {
        align-items: flex-start;
        flex-direction: column;
    }
`;

export const FaqRegisterTitle = styled.h1`
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    color: ${colors.coolGray800};
`;

export const FaqRegisterButtonGroup = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;

    @media (max-width: 640px) {
        width: 100%;
    }
`;

export const FaqRegisterButton = styled.button<FaqRegisterButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border: 1px solid;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    transition:
        border-color 0.2s,
        color 0.2s,
        background-color 0.2s;

    ${(props) => buttonSize[props.$size]}
    ${(props) => buttonVariant[props.$variant]};

    @media (max-width: 640px) {
        flex: 1;
    }
`;

export const FaqRegisterFormSection = styled.section`
    background: ${colors.primaryWhite};
`;

export const FaqRegisterFormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-top: 1px solid ${colors.coolGray200};
    border-left: 1px solid ${colors.coolGray200};

    @media (max-width: 1180px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

export const FaqRegisterFormCell = styled.div<FaqRegisterFormCellProps>`
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr);
    min-width: 0;
    min-height: 44px;
    border-right: 1px solid ${colors.coolGray200};
    border-bottom: 1px solid ${colors.coolGray200};

    ${(props) =>
        props.$span === 'wide' &&
        css`
            grid-column: span 2;
        `}

    ${(props) =>
        props.$span === 'full' &&
        css`
            grid-column: 1 / -1;
        `};

    @media (max-width: 760px) {
        grid-template-columns: 96px minmax(0, 1fr);

        ${(props) =>
            props.$span === 'wide' &&
            css`
                grid-column: auto;
            `}
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

export const FaqRegisterLabel = styled.label`
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

export const FaqRegisterRequiredMark = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: ${colors.red500};
`;

export const FaqRegisterStaticText = styled.p`
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
    margin: 0;
    padding: 0 8px;
    font-size: 13px;
    font-weight: 400;
    color: ${colors.coolGray800};
`;

export const FaqRegisterStaticTextEmphasis = styled.span`
    font-weight: 500;
    color: ${colors.coolGray800};
`;

export const FaqRegisterInput = styled.input`
    ${control}
`;

export const FaqRegisterSelectBox = styled.div`
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

export const FaqRegisterSelect = styled.select`
    ${control};
    width: 100%;
    margin: 0;
    appearance: none;
    padding-right: 34px;
    cursor: pointer;

    &:disabled {
        color: ${colors.coolGray400};
        background: ${colors.coolGray50};
        cursor: not-allowed;
    }
`;

export const FaqRegisterCheckbox = styled.input`
    width: 16px;
    height: 16px;
    margin: 0;
    border: 1px solid ${colors.coolGray200};
    border-radius: 3px;
    appearance: none;
    background: ${colors.primaryWhite};
    cursor: pointer;

    &:checked {
        border-color: ${colors.greenPrimary};
        background: ${colors.greenPrimary} url('/assets/images/admin-checkbox-checked.svg') center / 16px 16px no-repeat;
    }
`;

export const FaqRegisterCheckboxLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin: 8px;
    font-size: 13px;
    color: ${colors.coolGray800};
    cursor: pointer;
`;

export const FaqRegisterEditorSection = styled.section`
    height: clamp(520px, calc(100vh - 230px), 720px);
    border: 1px solid ${colors.coolGray200};
    background: ${colors.primaryWhite};

    @media (max-width: 760px) {
        height: 420px;
    }
`;

export const FaqRegisterEditorTextarea = styled.textarea`
    width: 100%;
    height: 100%;
    padding: 16px;
    font-size: 14px;
    line-height: 1.6;
    border: 0;
    outline: none;
    resize: none;
    color: ${colors.coolGray800};
    background: ${colors.primaryWhite};

    &::placeholder {
        color: ${colors.coolGray400};
    }
`;
