import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
    Container,
    Description,
    Image,
    Name,
    StatusContainer,
    StatusLabel,

} from './styles';

type Props = TouchableOpacityProps & {
    index: number;
}

export function OrderCard({ index, ...rest}: Props) {
    return (
        <Container index={index} {...rest}>
            <Image source={{uri:'https://github.com/santosfael.png'}} />

            <Name>4 Queijos</Name>

            <Description>
                Mesa 5 🞄 Qtd: 1
            </Description>

            <StatusContainer status="Preparando">
                <StatusLabel status="Preparando">Preparando</StatusLabel>
            </StatusContainer>
        </Container>
    );
}