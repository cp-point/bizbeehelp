import styled, { css } from 'styled-components';

type ToolbarButtonProps = {
    $isActive?: boolean;
};

const colors = {
    primaryWhite: '#ffffff',
    coolGray50: '#f8f9fb',
    coolGray100: '#edf1f5',
    coolGray150: '#e4e8ee',
    coolGray200: '#cdd3dd',
    coolGray400: '#8d99a8',
    coolGray600: '#4d5b6b',
    coolGray800: '#0f1b2a',
    green50: '#ecfdf3',
    greenPrimary: '#16b364',
};

export const EditorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 360px;
    background: ${colors.primaryWhite};
`;

export const Toolbar = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    padding: 8px;
    border-bottom: 1px solid ${colors.coolGray200};
    background: ${colors.coolGray50};
`;

export const ToolbarGroup = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
`;

export const ToolbarSelect = styled.select`
    height: 30px;
    min-width: 92px;
    padding: 0 28px 0 9px;
    font-size: 13px;
    font-weight: 600;
    border: 1px solid ${colors.coolGray200};
    border-radius: 4px;
    color: ${colors.coolGray800};
    background: ${colors.primaryWhite};
    cursor: pointer;

    &:focus {
        border-color: ${colors.greenPrimary};
        outline: none;
    }
`;

export const ToolbarDivider = styled.span`
    width: 1px;
    height: 20px;
    margin: 0 2px;
    background: ${colors.coolGray200};
`;

export const ToolbarButton = styled.button<ToolbarButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    height: 30px;
    padding: 0 9px;
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
    border: 1px solid ${colors.coolGray200};
    border-radius: 4px;
    color: ${colors.coolGray800};
    background: ${colors.primaryWhite};
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: ${colors.greenPrimary};
        color: ${colors.greenPrimary};
        background: ${colors.green50};
    }

    &:disabled {
        color: ${colors.coolGray400};
        background: ${colors.coolGray100};
        cursor: not-allowed;
    }

    ${(props) =>
        props.$isActive &&
        css`
            border-color: ${colors.greenPrimary};
            color: ${colors.greenPrimary};
            background: ${colors.green50};
        `}
`;

export const HiddenFileInput = styled.input`
    display: none;
`;

export const EditorBody = styled.div`
    flex: 1;
    min-height: 0;
    overflow: auto;

    .tiptap {
        min-height: 100%;
        padding: 16px;
        font-size: 14px;
        line-height: 1.7;
        color: ${colors.coolGray800};
        outline: none;
    }

    .tiptap p {
        margin: 0 0 10px;
    }

    .tiptap h1,
    .tiptap h2,
    .tiptap h3 {
        margin: 18px 0 10px;
        line-height: 1.35;
    }

    .tiptap ul,
    .tiptap ol {
        margin: 0 0 12px;
        padding-left: 24px;
    }

    .tiptap ul[data-type='taskList'] {
        padding-left: 0;
        list-style: none;
    }

    .tiptap ul[data-type='taskList'] li {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin-bottom: 6px;
    }

    .tiptap ul[data-type='taskList'] label {
        flex: 0 0 auto;
        margin-top: 2px;
    }

    .tiptap ul[data-type='taskList'] div {
        flex: 1;
    }

    .tiptap blockquote {
        margin: 12px 0;
        padding: 8px 12px;
        border-left: 3px solid ${colors.greenPrimary};
        background: ${colors.coolGray50};
    }

    .tiptap a {
        color: ${colors.greenPrimary};
        text-decoration: underline;
    }

    .tiptap img {
        display: block;
        max-width: 100%;
        height: auto;
        margin: 12px 0;
        border: 1px solid ${colors.coolGray150};
    }

    .tiptap p.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        float: left;
        height: 0;
        color: ${colors.coolGray400};
        pointer-events: none;
    }
`;

export const EmptyState = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    padding: 16px;
    font-size: 14px;
    color: ${colors.coolGray600};
`;
