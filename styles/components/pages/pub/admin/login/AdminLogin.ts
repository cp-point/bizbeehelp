import styled from 'styled-components';

const colors = {
  primaryWhite: '#ffffff',
  coolGrayBackground: '#f4f7f9',
  coolGray150: '#e4e8ee',
  coolGray200: '#cdd3dd',
  coolGray400: '#8d99a8',
  coolGray800: '#0f1b2a',
  greenPrimary: '#16b364',
  green600: '#039855',
  red50: '#fef3f2',
  red500: '#f04438',
};

export const Page = styled.main`
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

export const LogoArea = styled.div`
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 48px;
`;

export const Field = styled.div`
  & + & {
    margin-top: 12px;
  }
`;

export const Input = styled.input<{ $isError?: boolean }>`
  width: 100%;
  padding: 16px 20px;
  font-size: 14px;
  font-weight: 400;
  border: 1px solid ${(props) => (props.$isError ? colors.red500 : colors.coolGray150)};
  border-radius: 4px;
  outline: none;
  color: ${colors.coolGray800};
  background: ${colors.primaryWhite};
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &::placeholder {
    color: ${colors.coolGray400};
  }

  &:focus {
    border-color: ${(props) => (props.$isError ? colors.red500 : colors.greenPrimary)};
    box-shadow: 0 0 0 2px ${(props) => (props.$isError ? 'rgba(255, 59, 48, 0.1)' : 'rgba(22, 179, 100, 0.12)')};
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 5px;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.35;
  color: ${colors.red500};
`;

export const OptionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 10px;

  @media (max-width: 520px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
`;

export const SaveLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: ${colors.coolGray800};
  cursor: pointer;
`;

export const Checkbox = styled.input`
  flex: 0 0 16px;
  position: relative;
  width: 16px;
  height: 16px;
  margin: 0;
  border: 1px solid ${colors.coolGray200};
  border-radius: 3px;
  appearance: none;
  background: ${colors.primaryWhite};
  cursor: pointer;
  transition:
    border-color 0.2s,
    background-color 0.2s,
    opacity 0.2s;

  &:checked {
    border-color: ${colors.greenPrimary};
    background: ${colors.greenPrimary} url('/assets/images/admin-checkbox-checked.svg') center / 16px 16px no-repeat;
  }

  &:disabled {
    border-color: ${colors.coolGray200};
    background: ${colors.coolGray150};
    cursor: not-allowed;
  }

  &:disabled:checked {
    border-color: ${colors.coolGray200};
    background: ${colors.coolGray150} url('/assets/images/admin-checkbox-checked.svg') center / 16px 16px no-repeat;
    opacity: 0.75;
  }

  &:disabled + span {
    color: ${colors.coolGray200};
    cursor: not-allowed;
  }
`;

export const FindLinks = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 700;
  line-height: 12px;
  color: ${colors.coolGray400};
`;

export const FindLink = styled.a`
  text-decoration: none;
  color: inherit;
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

export const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  margin-top: 56px;
  font-size: 16px;
  font-weight: 700;
  border: 0;
  border-radius: 4px;
  line-height: 16px;
  color: ${colors.primaryWhite};
  background: ${colors.greenPrimary};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${colors.green600};
  }

  &:active {
    background: ${colors.green600};
  }

  ${LoginMessage} + & {
    margin-top: 10px;
  }

  @media (max-width: 520px) {
    margin-top: 48px;

    ${LoginMessage} + & {
      margin-top: 10px;
    }
  }
`;

export const Copyright = styled.p`
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
