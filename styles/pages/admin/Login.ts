import styled from 'styled-components';

const colors = {
    primaryWhite: '#ffffff',
    coolGrayBackground: '#f4f7f9',
    coolGray150: '#e4e8ee',
    coolGray400: '#8d99a8',
    coolGray800: '#0f1b2a',
    red50: '#fef3f2',
    red500: '#f04438',
};

export const LoginWrapper = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100dvh;
    padding: 32px 20px;
    background: ${colors.coolGrayBackground};

    @media (max-width: 520px) {
        align-items: flex-start;
        padding: 24px 16px;
    }
`;

export const LoginCard = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: min(100%, 450px);
    padding: 105px 40px 104px;
    border-radius: 8px;
    box-shadow: 0 16px 16px rgba(0, 0, 0, 0.08);
    background: ${colors.primaryWhite};

    @media (max-width: 520px) {
        padding: 72px 24px 56px;
    }
`;

export const LoginLogoArea = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;

    img {
        width: 219px;
        height: 48px;
    }

    @media (max-width: 520px) {
        img {
            width: 182px;
            height: auto;
        }
    }
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 48px;
`;

export const LoginField = styled.div`
    & + & {
        margin-top: 12px;
    }
`;

export const LoginMessage = styled.p`
    display: flex;
    align-items: center;
    gap: 4px;
    min-height: 32px;
    padding: 8px 10px;
    margin-top: 14px;
    font-size: 13px;
    font-weight: 600;
    border-radius: 4px;
    color: ${colors.red500};
    background: ${colors.red50};

    img {
        flex: 0 0 16px;
    }
`;

export const LoginStatusArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    margin-top: 48px;
    border: 1px solid ${colors.coolGray150};
    border-radius: 4px;
    background: ${colors.primaryWhite};
    padding: 16px 20px;
`;

export const LoginStatusText = styled.p`
    margin: 0;
    color: ${colors.coolGray800};
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
`;

export const LoginCopyright = styled.p`
    margin-top: 90px;
    font-size: 11px;
    font-weight: 400;
    line-height: 11px;
    text-align: center;
    color: ${colors.coolGray400};

    @media (max-width: 520px) {
        margin-top: 72px;
    }
`;
