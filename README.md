# GoPizza

![Capa_projeto](./.github/Capa.png)
\
\
É um dos projetos que são desenvolvidos na trilha de React Native da equipe Rocketseat, para colocar em pratica todo o aprendizado adquirido.\
O projeto e desenvolvido pela cli do [Expo](https://docs.expo.dev/), tem como objetivo o desenvolvimento de uma aplicação para auxlia Garçons de uma Pizzaria, no mesmo tem a área do administrator para cadastrar o cardápio de pizzas a do garçom que faz a anotação do pedido do cliente e acompanha todo o processo de preparação.



## 🔨 Funcionalidades da aplicação
* Admin
    * Cadastrar nova pizza
    * Alterar cadastro de pizza
    * Excluir pizza
    * Informar que a pizza está pronta (ainda será implemantado)
* Garçom
    * Fazer pedido
    * Listagem de pizzas prontas

## Iniciar um Projeto com Expo-cli
### Devemos ter instalado as seguintes ferramentas:
* [Nodejs](https://nodejs.org/en/) together with Npm*
    * Sempre instalar a vesão LTS(LONG TIME SUPORT)
* [Yarn](https://yarnpkg.com/)(Não é necessário ter)
* [Expo cli](https://docs.expo.dev/get-started/installation/)

### Tecnologias utilizadas
* Expo-cli
* Typescript
* CSS

## Bibliotecas instaladas
* expo-google-fonts
* react-navigation
* react-native-async-storage
* react-native-firebase
* react-navigation
* react-navigation/bottom-tabs
* react-navigation/native-stack
* expo-image-picker
* expo-auth-session
* react-native-gesture-handler
* react-native-reanimated
* styled-components

## Introdução para cirar uma aplicaçao com o Expo-cli
Este projeto foi inicializado com [Expo-cli App](https://docs.expo.dev/).

### Available Scripts
Instale todas as dependências da aplicação no diretório do projeto\
`yarn` ou `npx install`\
No diretório do projeto, você pode executar:\
- Observação: Como está sendo usado recursos nativos do Android, recomendo usar o emulador para testar a aplicação\
`expo start` (Como o projeto foi desenvolvido utilizando o Expo com managed workflow, sendo assim ao digitar `yarn start` ele não abre a página para usar o smartphone físico pelo QrCode)

#### Para configurar o emulador do Android recomendo o Tutorial da Rocketseat 
[Ambiente React Native](https://react-native.rocketseat.dev/)
#### Os passos abaixo é para aqueles que querem usar o emulador do Android ou iOS
Para inicializar a aplicação no Windows e no Mac:\
`yarn Android` ou `npx run-android`\
Para inicializar no Linux:\
`yarn start` e em outro terminal `yarn android`\
`npx start ` e em outro terminal `npx run-android`\
Para usar o emulador IOS(Mac)\
`yarn ios` ou `npx run-ios`

[Linkedin](www.linkedin.com/in/rafael-rocha-dos-santos-7b133410b)