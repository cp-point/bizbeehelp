import styled from 'styled-components';

export const AdminLayoutWrapper = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #ffffff;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const AdminContent = styled.div`
    flex: 1;
    min-width: 0;
    padding: 32px;

    @media (max-width: 768px) {
        padding: 20px 16px;
    }
`;
