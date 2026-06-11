'use client';

import React, { useEffect, useState } from 'react';
import Button from '../../../../components/atom/Button';
import Input from '../../../../components/atom/Input';
import {
    LoginField,
    LoginForm,
    LoginLabel,
    LoginMessage,
    LoginPanel,
    LoginTitle,
    LoginWrapper,
} from '../../../../styles/pages/admin/Login';
import { Post } from '../../../../service/crud';

const Page = () => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        if (searchParams.get('loginRequired') === 'true') {
            alert('로그인이 필요합니다.');
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
                    window.location.href = '/admin/faq-categories';
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
            <LoginPanel>
                <LoginTitle>BizHelp 로그인</LoginTitle>
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
            </LoginPanel>
        </LoginWrapper>
    );
};

export default Page;
