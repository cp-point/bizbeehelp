'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { ResponseType } from '../../../../../enum/Common';
import { Post } from '../../../../../service/crud';
import * as S from '../../../../../styles/components/pages/pub/admin/login/AdminLogin';

type LoginError = {
  loginId?: string;
  password?: string;
};

const AdminLogin = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginError>({});
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get('loginRequired') === 'true') {
      alert('로그인이 필요합니다.');
      window.history.replaceState(null, '', '/pub/admin/login');
    }
  }, []);

  const resetFieldFeedback = (field: keyof LoginError) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setLoginMessage('');
  };

  const validate = () => {
    const nextErrors: LoginError = {};

    if (!loginId.trim()) {
      nextErrors.loginId = '아이디를 입력해 주세요.';
    }

    if (!password) {
      nextErrors.password = '비밀번호를 입력해 주세요.';
    }

    setErrors(nextErrors);
    setLoginMessage('');

    return Object.keys(nextErrors).length === 0;
  };

  const submitLogin = () => {
    if (!validate()) {
      return;
    }

    Post(
      '/admin/login',
      {
        userId: loginId.trim(),
        password,
      },
      (response) => {
        if (response.type === ResponseType.SUCCESS) {
          window.location.href = '/pub/admin/faqs';
          return;
        }

        setLoginMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
      },
      false,
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitLogin();
  };

  return (
    <S.Page>
      <S.LoginCard>
        <S.LogoArea>
          <Image src="/assets/images/header-logo.svg" alt="bizbee Help" width={219} height={48} priority />
        </S.LogoArea>

        <S.Form noValidate onSubmit={handleSubmit}>
          <S.Field>
            <S.Input
              id="admin-login-id"
              name="loginId"
              value={loginId}
              placeholder="아이디"
              autoComplete="username"
              $isError={Boolean(errors.loginId)}
              onChange={(event) => {
                setLoginId(event.target.value);
                resetFieldFeedback('loginId');
              }}
            />
            {errors.loginId ? <S.ErrorMessage>{errors.loginId}</S.ErrorMessage> : null}
          </S.Field>

          <S.Field>
            <S.Input
              id="admin-password"
              name="password"
              type="password"
              value={password}
              placeholder="비밀번호"
              autoComplete="current-password"
              $isError={Boolean(errors.password)}
              onChange={(event) => {
                setPassword(event.target.value);
                resetFieldFeedback('password');
              }}
            />
            {errors.password ? <S.ErrorMessage>{errors.password}</S.ErrorMessage> : null}
          </S.Field>

          {/*
          <S.OptionRow>
            <S.SaveLabel htmlFor="admin-save-account">
              <S.Checkbox
                id="admin-save-account"
                type="checkbox"
                checked={saveAccount}
                onChange={(event) => setSaveAccount(event.target.checked)}
              />
              <span>아이디 & 회사코드 저장</span>
            </S.SaveLabel>

            <S.FindLinks>
              <S.FindLink href="#none">아이디 찾기</S.FindLink>
              <S.FindLink href="#none">비밀번호 찾기</S.FindLink>
            </S.FindLinks>
          </S.OptionRow>
          */}

          {loginMessage ? (
            <S.LoginMessage role="alert">
              <Image src="/assets/images/icon-login-error.svg" alt="" width={16} height={16} />
              <span>{loginMessage}</span>
            </S.LoginMessage>
          ) : null}

          <S.SubmitButton type="submit">
            로그인
          </S.SubmitButton>
        </S.Form>

        <S.Copyright>Copyright © bizbee. All Rights Reserved.</S.Copyright>
      </S.LoginCard>
    </S.Page>
  );
};

export default AdminLogin;
