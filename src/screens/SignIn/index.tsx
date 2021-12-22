import React from 'react';

import { Input } from '@components/Input';
import { Button } from '@components/Button';

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

export function SignIn(){
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
                    />

                    <Input 
                        placeholder='Senha'
                        type='secondary'
                        autoCorrect={false}
                        secureTextEntry
                    />
                    <ForgotPasswordButton>
                        <ForgotPAsswordLabel>Esqueci minha senha</ForgotPAsswordLabel>
                    </ForgotPasswordButton>
                    
                    <Button
                        title='Entrar'
                        type='secondary'
                    />
                </Content>
            </KeyboardAvoidingView>
        </Container>
    );
}