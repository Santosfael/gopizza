import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';

import { ProductNavigationProps } from '@src/@types/navigation';

import { ProductProps } from '@components/ProductCard';
import { ButtonBack } from '@components/ButtonBack';
import { InputPrice } from '@components/InputPrice';
import { Button } from '@components/Button';
import { Photo } from '@components/Photo';
import { Input } from '@components/Input';

import {
    Container,
    Header,
    Title,
    DeleteLabel,
    Upload,
    PickImageButton,
    Form,
    Label,
    InputGroup,
    InputGroupHeader,
    MaxCharacters
} from './styles';

type PizzaResponse = ProductProps & {
    photo_path: string;
    prices_sizes: {
        p: string;
        m: string;
        g: string;
    }
}

export function Product() {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priceSizeP, setPriceSizeP] = useState('');
    const [priceSizeM, setPriceSizeM] = useState('');
    const [priceSizeG, setPriceSizeG] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ photoPath, setPhotoPath ] = useState('');

    const route = useRoute();
    const { id } = route.params as ProductNavigationProps;

    useEffect(() => {
        if(id) {
            firestore()
            .collection('pizzas')
            .doc(id)
            .get()
            .then(response => {
                const product = response.data() as PizzaResponse;
                setName(product.name);
                setImage(product.photo_url)
                setDescription(product.description);
                setPriceSizeP(product.prices_sizes.p);
                setPriceSizeM(product.prices_sizes.m);
                setPriceSizeG(product.prices_sizes.g);
                setPhotoPath(product.photo_path);
            })
        }
    }, [id]);

    async function handlePickerImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4]
            });

            if (!result.cancelled)
                setImage(result.uri)
        }
    }

    async function handleAdd() {
        if (!name.trim())
            return Alert.alert('Cadastro', 'Informe o nome da pizza.');

        if (!description.trim())
            return Alert.alert('Cadastro', 'Informe a descrição da pizza.');

        if (!image.trim())
            return Alert.alert('Cadastro', 'Selecione a imagem da pizza.');

        if (!priceSizeP.trim() || !priceSizeM.trim() || !priceSizeG.trim())
            return Alert.alert('Cadastro', 'Informe o valor de todos os tamanhos de pizza.');

        setIsLoading(true);

        const fileName = new Date().getTime();
        const reference = storage().ref(`/pizzas/${fileName}.png`);

        await reference.putFile(image);
        const photo_url = await reference.getDownloadURL();

        firestore()
            .collection('pizzas')
            .add({
                name,
                name_insensitive: name.toLowerCase().trim(),
                description,
                prices_sizes: {
                    p: priceSizeP,
                    m: priceSizeM,
                    g: priceSizeG
                },
                photo_url,
                photo_path: reference.fullPath
            })
            .then(() => Alert.alert('Cadastro', 'Pizza cadastrada com sucesso.'))
            .catch(() => Alert.alert('Cadastro', 'Não foi possível salvar a pizza.'));

        setIsLoading(false);
    }
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header>
                    <ButtonBack />
                    <Title>Cadastrar</Title>
                    <TouchableOpacity>
                        <DeleteLabel>Delete</DeleteLabel>
                    </TouchableOpacity>
                </Header>
                <Upload>
                    <Photo uri={image} />

                    <PickImageButton
                        title='Carregar'
                        type="secondary"
                        onPress={handlePickerImage}
                    />
                </Upload>
                <Form>
                    <InputGroup>
                        <Label>Nome</Label>
                        <Input
                            onChangeText={setName}
                            value={name}
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputGroupHeader>
                            <Label>Descrição</Label>
                            <MaxCharacters>0 de 60 caracteres</MaxCharacters>
                        </InputGroupHeader>

                        <Input
                            multiline
                            maxLength={60}
                            style={{ height: 80 }}
                            onChangeText={setDescription}
                            value={description}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Tamanhos e preço</Label>
                        <InputPrice
                            size="P"
                            onChangeText={setPriceSizeP}
                            value={priceSizeP}
                        />
                        <InputPrice
                            size="M"
                            onChangeText={setPriceSizeM}
                            value={priceSizeM}
                        />
                        <InputPrice
                            size="G"
                            onChangeText={setPriceSizeG}
                            value={priceSizeG}
                        />
                    </InputGroup>

                    <Button
                        title='Cadastrar pizza'
                        isLoading={isLoading}
                        onPress={handleAdd}
                    />
                </Form>
            </ScrollView>
        </Container>
    );
}