'use client';

import Image from 'next/image';
import React, { useEffect, useState, useSyncExternalStore } from 'react';
import Button from '../../../../components/atom/Button';
import Input from '../../../../components/atom/Input';
import {
    LoginCard,
    LoginCopyright,
    LoginField,
    LoginForm,
    LoginLogoArea,
    LoginMessage,
    LoginStatusArea,
    LoginStatusText,
    LoginWrapper,
} from '../../../../styles/pages/admin/Login';
import { Post } from '../../../../service/crud';
import type { User } from '../../../../store/userStore';
import { userStore } from '../../../../store/userStore';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const isLoginResult = (result: unknown): result is User => {
    if (!result || typeof result !== 'object') {
        return false;
    }

    const user = result as Partial<User>;

    return typeof user.userId === 'string' && typeof user.authenticated === 'boolean';
};

const Page = () => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const userData = useSyncExternalStore(
        userStore.subscribe,
        () => userStore.getState().userData,
        () => null,
    );

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        if (searchParams.get('loginRequired') === 'true') {
            alert('로그인이 필요합니다.');
            userStore.getState().reset();
            window.history.replaceState(null, '', '/admin/login');
        }
    }, []);

    const handleSubmit = (event: React.SubmitEvent) => {
        event.preventDefault();

        if (!loginId || !password) {
            setMessage('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        const payload = {
            userId: loginId,
            password,
        };

        Post(
            '/admin/login',
            payload,
            (response) => {
                if (response.type === 'SUCCESS') {
                    setMessage(response.message || '로그인되었습니다.');
                    if (isLoginResult(response.result)) {
                        userStore.getState().setUserData(response.result);
                    }
                    window.location.href = '/admin/faqs';
                    return;
                }

                setMessage(response.message || '로그인에 실패했습니다.');
            },
            false,
        );
    };

    const handleClickLogout = () => {
        Post(
            '/admin/logout',
            {},
            (response) => {
                if (response.type === 'SUCCESS') {
                    userStore.getState().reset();
                    setMessage('');
                    return;
                }

                alert(response.message || '로그아웃에 실패했습니다.');
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
                {userData ? (
                    <LoginStatusArea>
                        <LoginStatusText>{userData.userId}님은 로그인이 완료되었습니다.</LoginStatusText>
                        <Button
                            type="button"
                            width="40px"
                            height="40px"
                            padding="0"
                            color="#0f1b2a"
                            backgroundColor="#ffffff"
                            border="1px solid #e4e8ee"
                            borderRadius="4px"
                            shadow="none"
                            ariaLabel="로그아웃"
                            onClick={handleClickLogout}
                        >
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </Button>
                    </LoginStatusArea>
                ) : (
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
                )}

                <LoginCopyright>Copyright © bizbee. All Rights Reserved.</LoginCopyright>
            </LoginCard>
        </LoginWrapper>
    );
};

export default Page;
