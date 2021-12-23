import React, { useState } from 'react';
import { Platform, ScrollView } from 'react-native';

import { RadioButton } from '@components/RadioButton';
import { ButtonBack } from '@components/ButtonBack';

import { PIZZA_TYPES } from '../../utils/pizzaTypes';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import {
    Container,
    ContentScroll,
    Form,
    FormRow,
    Header,
    InputGroup,
    Label,
    Photo,
    Price,
    Sizes,
    Title,
} from './styles';

export function Order() {
    const [sizes, setSizes] = useState('');
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ContentScroll>
                <Header>
                    <ButtonBack
                        onPress={() => { }}
                        style={{ marginBottom: 108 }}
                    />
                </Header>

                <Photo source={{ uri: 'https://github.com/santosfael.png' }} />

                <Form>
                    <Title>Nome da pizza</Title>
                    <Label>Selecione o tamanho da pizza</Label>

                    <Sizes>
                        {
                            PIZZA_TYPES.map(item => (
                                <RadioButton
                                    key={item.id}
                                    title={item.name}
                                    selected={sizes === item.id}
                                    onPress={() => setSizes(item.id)}
                                />
                            ))
                        }
                    </Sizes>

                    <FormRow>
                        <InputGroup>
                            <Label>Número da mesa</Label>
                            <Input keyboardType='numeric' />
                        </InputGroup>

                        <InputGroup>
                            <Label>Quantidade</Label>
                            <Input keyboardType='numeric' />
                        </InputGroup>
                    </FormRow>

                    <Price>valor de R$ 00,00</Price>
                    <Button
                        title='Confirmar pedido'
                    />
                </Form>
            </ContentScroll>
        </Container>
    );
}