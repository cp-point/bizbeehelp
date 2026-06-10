'use client';

import React, { useState } from 'react';
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

    const handleSubmit = (event: React.SubmitEvent) => {
            event.preventDefault();

            if (!loginId || !password) {
                setMessage('아이디와 비밀번호를 입력해주세요.');
                return;
            }
            const payload = {
                userId: loginId,
                password: password,
            };
            Post(
                '/admin/login',
                payload,
                (response) => {
                    if (response.result) {
                        console.log(response.result);
                    }
                },
                false,
            );

            setMessage('로그인 API 연동 후 처리될 예정입니다.');
        }
    ;

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
