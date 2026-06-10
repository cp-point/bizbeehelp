import styled from 'styled-components';

type PaginationWrapperProps = {
    $margin?: string;
};

type PaginationButtonProps = {
    $isActive?: boolean;
};

export const PaginationWrapper = styled.div<PaginationWrapperProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin: ${(props) => props.$margin};
`;

export const PaginationButton = styled.button<PaginationButtonProps>`
    min-width: 34px;
    height: 34px;
    border: 1px solid ${(props) => (props.$isActive ? '#1677ff' : '#d9dde3')};
    border-radius: 6px;
    padding: 0 10px;
    color: ${(props) => (props.$isActive ? '#ffffff' : '#374151')};
    background-color: ${(props) => (props.$isActive ? '#1677ff' : '#ffffff')};
    font-size: 14px;
    line-height: 1;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: #1677ff;
        color: ${(props) => (props.$isActive ? '#ffffff' : '#1677ff')};
    }

    &:disabled {
        color: #b8bec7;
        background-color: #f5f6f8;
        cursor: not-allowed;
    }
`;

export const PaginationInfo = styled.span`
    margin-left: 8px;
    color: #6b7280;
    font-size: 13px;
    line-height: 1.4;
`;
