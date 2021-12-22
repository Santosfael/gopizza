import React, { useState } from 'react';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/auth';

import brandImg from '@assets/brand.png';

import {
    Brand,
    Container,
    Content,
    ForgotPasswordButton,
    ForgotPAsswordLabel,
    Title
} from './styles';
import { KeyboardAvoidingView, Platform } from 'react-native';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, forgotPassword, isLogging } = useAuth();

    function handleSignIn() {
        signIn(email, password);
    }

    function handleForgotPassword() {
        forgotPassword(email);
    }

    return (
        <Container>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <Content>
                    <Brand source={brandImg} />

                    <Title>Login</Title>

                    <Input
                        placeholder='E-mail'
                        type='secondary'
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={setEmail}
                        value={email}
                    />

                    <Input
                        placeholder='Senha'
                        type='secondary'
                        autoCorrect={false}
                        secureTextEntry
                        onChangeText={setPassword}
                        value={password}
                    />
                    <ForgotPasswordButton onPress={handleForgotPassword}>
                        <ForgotPAsswordLabel>Esqueci minha senha</ForgotPAsswordLabel>
                    </ForgotPasswordButton>

                    <Button
                        title='Entrar'
                        type='secondary'
                        onPress={handleSignIn}
                        isLoading={isLogging}
                    />
                </Content>
            </KeyboardAvoidingView>
        </Container>
    );
}