import styled from 'styled-components';

export const LoginWrapper = styled.main`
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: #f5f6f8;
    padding: 24px;
`;

export const LoginPanel = styled.section`
    width: 100%;
    max-width: 380px;
    border: 1px solid #d9dde3;
    border-radius: 8px;
    background-color: #ffffff;
    padding: 32px;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
`;

export const LoginTitle = styled.h1`
    margin-bottom: 24px;
    color: #111827;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.3;
    text-align: center;
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const LoginField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const LoginLabel = styled.label`
    color: #374151;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.4;
`;

export const LoginMessage = styled.p`
    color: #dc2626;
    font-size: 13px;
    line-height: 1.4;
`;
