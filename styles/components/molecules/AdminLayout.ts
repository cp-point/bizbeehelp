import styled from 'styled-components';

export const AdminLayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #ffffff;
`;

export const AdminBody = styled.div`
    display: flex;
    min-height: calc(100vh - 64px);
    background-color: #ffffff;

    @media (max-width: 1024px) {
        flex-direction: column;
    }
`;

export const AdminContent = styled.div`
    flex: 1;
    overflow-x: auto;
    min-width: 0;
    padding: 16px 24px 32px;
    background-color: #ffffff;

    @media (max-width: 1024px) {
        padding: 16px 20px 28px;
    }

    @media (max-width: 640px) {
        padding: 12px 12px 24px;
    }
`;
