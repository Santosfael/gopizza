import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import { OrderNavigationProps } from '@src/@types/navigation';
import { RadioButton } from '@components/RadioButton';
import { ButtonBack } from '@components/ButtonBack';

import { ProductProps } from '@src/components/ProductCard';
import { PIZZA_TYPES } from '../../utils/pizzaTypes';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { useAuth } from '@hooks/auth';

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

type PizzaResponse = ProductProps & {
    prices_sizes: {
        [key: string]: number;
    }
}

export function Order() {
    const [ sizes, setSizes ] = useState('');
    const [ pizza, setPizza ] = useState<PizzaResponse>({} as PizzaResponse);
    const [ quantity, setQuantity ] = useState(0);
    const [ tableNumber, setTableNumber ] = useState('');
    const [ sendingOrder, setSendingOrder ] = useState(false);
    const { user } = useAuth();

    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params as OrderNavigationProps;

    const amount = sizes ? pizza.prices_sizes[sizes] * quantity : '0,00';

    function handleGoBack() {
        navigation.goBack();
    }

    function handleOrder() {
        if(!sizes) return Alert.alert('Pedido', 'Selecione o tamanho da pizza.');

        if(!tableNumber) return Alert.alert('Pedido', 'Infome o número da mesa.');

        if(!quantity) return Alert.alert('Pedido', 'Informe a quantidade.');

        setSendingOrder(true);

        firestore()
            .collection('orders')
            .add({
            quantity,
            amount,
            pizza: pizza.name,
            sizes,
            table_number: tableNumber,
            status: 'Preparando',
                waiter_id: user?.id,
                image: pizza.photo_url
            })
        .then(() => navigation.navigate('home'))
        .catch(() => {
            Alert.alert('Pedido', 'Não foi possível realizar o pedido');
            setSendingOrder(false);
        })
    }

    useEffect(() => {
        if(id) {
            firestore()
                .collection('pizzas')
                .doc(id)
                .get()
            .then(response => setPizza(response.data() as PizzaResponse))
            .catch(() => Alert.alert('Pedido', 'Não foi possível caregar o produto'));
        }
    },[id]);

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ContentScroll>
                <Header>
                    <ButtonBack
                        onPress={handleGoBack}
                        style={{ marginBottom: 108 }}
                    />
                </Header>

                <Photo source={{ uri: pizza.photo_url }} />

                <Form>
                    <Title>{pizza.name}</Title>
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
                            <Input keyboardType='numeric' onChangeText={setTableNumber} />
                        </InputGroup>

                        <InputGroup>
                            <Label>Quantidade</Label>
                            <Input keyboardType='numeric' onChangeText={(value) => setQuantity(Number(value))} />
                        </InputGroup>
                    </FormRow>

                    <Price>valor de R$ {amount}</Price>
                    <Button
                        title='Confirmar pedido'
                        onPress={handleOrder}
                        isLoading={sendingOrder}
                    />
                </Form>
            </ContentScroll>
        </Container>
    );
}