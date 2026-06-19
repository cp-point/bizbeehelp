'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import Button from '../../../../components/atom/Button';
import Card from '../../../../components/atom/Card';
import Input from '../../../../components/atom/Input';
import {
    LoginField,
    LoginForm,
    LoginLabel,
    LoginMessage,
    LoginStatusArea,
    LoginStatusText,
    LoginTitle,
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
            <Card
                width="100%"
                padding="32px"
                border="1px solid #d9dde3"
                borderRadius="8px"
                shadow="0 12px 28px rgba(15, 23, 42, 0.08)"
                style={{ maxWidth: '380px' }}
            >
                <LoginTitle>BizHelp 로그인</LoginTitle>
                {userData ? (
                    <LoginStatusArea>
                        <LoginStatusText>{userData.userId}님은 이미 로그인되어 있습니다.</LoginStatusText>
                        <Button
                            type="button"
                            width="38px"
                            height="38px"
                            color="#374151"
                            backgroundColor="#ffffff"
                            border="1px solid #d9dde3"
                            borderRadius="6px"
                            shadow="none"
                            padding="0"
                            ariaLabel="로그아웃"
                            onClick={handleClickLogout}
                        >
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </Button>
                    </LoginStatusArea>
                ) : (
                    <LoginForm onSubmit={handleSubmit}>
                        <LoginField>
                            <LoginLabel htmlFor="loginId">아이디</LoginLabel>
                            <Input
                                id="loginId"
                                name="loginId"
                                value={loginId}
                                placeholder="아이디를 입력하세요"
                                height="42px"
                                onChange={(event) => setLoginId(event.target.value)}
                                onKeyDown={handleEnterKeyDown}
                            />
                        </LoginField>
                        <LoginField>
                            <LoginLabel htmlFor="password">비밀번호</LoginLabel>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                placeholder="비밀번호를 입력하세요"
                                height="42px"
                                onChange={(event) => setPassword(event.target.value)}
                                onKeyDown={handleEnterKeyDown}
                            />
                        </LoginField>
                        {message ? <LoginMessage>{message}</LoginMessage> : null}
                        <Button
                            type="submit"
                            width="100%"
                            height="42px"
                            color="#ffffff"
                            backgroundColor="#1677ff"
                            border="0"
                            borderRadius="6px"
                            shadow="none"
                            fontSize="15px"
                        >
                            로그인
                        </Button>
                    </LoginForm>
                )}
            </Card>
        </LoginWrapper>
    );
};

export default Page;
