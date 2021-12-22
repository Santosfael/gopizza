import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import { ButtonBack } from '@components/ButtonBack';
import { Photo } from '@components/Photo';

import {
    Container,
    Header,
    Title,
    DeleteLabel,
    Upload,
    PickImageButton,
} from './styles';

export function Product() {
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Header>
                <ButtonBack />
                <Title>Cadastrar</Title>
                <TouchableOpacity>
                    <DeleteLabel>Delete</DeleteLabel>
                </TouchableOpacity>
            </Header>
            <Upload>
                <Photo uri="" />

                <PickImageButton title='Carregar' type="secondary" />
            </Upload>
        </Container>
    );
}