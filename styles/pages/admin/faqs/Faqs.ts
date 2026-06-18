import styled from 'styled-components';

export const FaqsPage = styled.main`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding: 24px;
`;

export const FaqsHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

export const FaqsTitle = styled.h1`
    margin: 0;
    color: #111827;
    font-size: 22px;
    font-weight: 700;
    line-height: 1.4;
`;

export const FaqsActionArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
`;

export const FaqsSection = styled.section`
    width: 100%;
`;

export const FaqsForm = styled.div`
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
    width: 100%;
    border: 1px solid #d9dde3;
    border-radius: 6px;
    background-color: #ffffff;
    padding: 16px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const FaqsField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
`;

export const FaqsLabel = styled.label`
    color: #374151;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.4;
`;

export const FaqsDateRange = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 8px;
`;

export const FaqsDateDivider = styled.span`
    color: #6b7280;
    font-size: 14px;
    line-height: 1;
`;
