import React from 'react';
import { FlatList } from 'react-native';

import { ItemSeparator } from '@components/ItemSeparator';
import { OrderCard } from '@components/OrderCard';

import {
    Container,
    Header,
    Title
} from './styles';

export function Orders() {
    return (
        <Container>
            <Header>
                <Title>Pedidos feitos</Title>
            </Header>

            <FlatList
                data={['1', '2', '3']}
                keyExtractor={item => item}
                renderItem={({ item, index}) => (
                    <OrderCard index={index} />
                )}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 125, paddingHorizontal: 24}}
                ItemSeparatorComponent={() => <ItemSeparator />}
            />

        </Container>
    );
}