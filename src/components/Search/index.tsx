import React from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';

import { useTheme } from 'styled-components/native';

import {
    Container,
    InputArea,
    Input,
    Button,
    ButtonClear,
} from './styles';

type Props = TextInputProps & {
    onSearch:() => void;
    onClear: () => void;
}

export function Search({ onClear, onSearch, ...rest }: Props){
    const { COLORS } = useTheme();
    return (
        <Container>
            <InputArea>
                <Input placeholder='pesquisar...' {...rest} />

                <ButtonClear onPress={onClear}>
                    <Feather name='x' size={16} />
                </ButtonClear>
            </InputArea>

            <Button onPress={onSearch}>
                <Feather name="search" size={16} color={COLORS.TITLE} />
            </Button>
        </Container>
    );
}