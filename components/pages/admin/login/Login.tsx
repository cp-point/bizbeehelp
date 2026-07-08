'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from '../../../atom/Button';
import Input from '../../../atom/Input';
import {
    LoginCard,
    LoginCopyright,
    LoginField,
    LoginForm,
    LoginLogoArea,
    LoginMessage,
    LoginWrapper,
} from '../../../../styles/pages/admin/Login';
import { Post } from '../../../../service/crud';
import type { User } from '../../../../store/userStore';
import { userStore } from '../../../../store/userStore';

const ADMIN_FAQ_LIST_PATH = '/admin/faqs';
const ADMIN_LOGIN_PATH = '/admin/login';

type LoginProps = {
    loginRequired?: boolean;
};

const isLoginResult = (result: unknown): result is User => {
    if (!result || typeof result !== 'object') {
        return false;
    }

    const user = result as Partial<User>;

    return typeof user.userId === 'string' && typeof user.authenticated === 'boolean';
};

const Login = ({ loginRequired = false }: LoginProps) => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        userStore.getState().reset();

        if (!loginRequired) {
            return;
        }

        alert('로그인이 필요합니다.');
        window.history.replaceState(null, '', ADMIN_LOGIN_PATH);
    }, [loginRequired]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!loginId || !password) {
            setMessage('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        Post(
            '/admin/login',
            {
                userId: loginId,
                password,
            },
            (response) => {
                if (response.type === 'SUCCESS') {
                    setMessage(response.message || '로그인되었습니다.');

                    if (isLoginResult(response.result)) {
                        userStore.getState().setUserData(response.result);
                    }

                    window.location.href = ADMIN_FAQ_LIST_PATH;
                    return;
                }

                setMessage(response.message || '로그인에 실패했습니다.');
            },
            false,
        );
    };

    const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') {
            return;
        }

        event.preventDefault();
        event.currentTarget.form?.requestSubmit();
    };

    return (
        <LoginWrapper>
            <LoginCard>
                <LoginLogoArea>
                    <Image src="/assets/images/header-logo.svg" alt="bizbee Help" width={219} height={48} priority />
                </LoginLogoArea>
                <LoginForm noValidate onSubmit={handleSubmit}>
                    <LoginField>
                        <Input
                            id="loginId"
                            name="loginId"
                            value={loginId}
                            placeholder="아이디"
                            autoComplete="username"
                            height="52px"
                            padding="0 20px"
                            color="#0f1b2a"
                            border={`1px solid ${message ? '#f04438' : '#e4e8ee'}`}
                            borderRadius="4px"
                            onChange={(event) => setLoginId(event.target.value)}
                            onKeyDown={handleEnterKeyDown}
                        />
                    </LoginField>
                    <LoginField>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            placeholder="비밀번호"
                            autoComplete="current-password"
                            height="52px"
                            padding="0 20px"
                            color="#0f1b2a"
                            border={`1px solid ${message ? '#f04438' : '#e4e8ee'}`}
                            borderRadius="4px"
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={handleEnterKeyDown}
                        />
                    </LoginField>
                    {message ? (
                        <LoginMessage role="alert">
                            <Image src="/assets/images/icon-login-error.svg" alt="" width={16} height={16} />
                            <span>{message}</span>
                        </LoginMessage>
                    ) : null}
                    <Button
                        type="submit"
                        width="100%"
                        height="56px"
                        margin={message ? '10px 0 0' : '56px 0 0'}
                        padding="0"
                        color="#ffffff"
                        backgroundColor="#16b364"
                        border="0"
                        borderRadius="4px"
                        shadow="none"
                        fontSize="16px"
                    >
                        로그인
                    </Button>
                </LoginForm>

                <LoginCopyright>Copyright © bizbee. All Rights Reserved.</LoginCopyright>
            </LoginCard>
        </LoginWrapper>
    );
};

export default Login;
