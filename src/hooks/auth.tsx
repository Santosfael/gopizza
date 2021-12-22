import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from "react";
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    id: string;
    name: string;
    isAdmin: boolean;
}

type AuthContexData = {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    isLogging: boolean;
    user: User | null;
}

type AuthProviderProps = {
    children: ReactNode;
}

const USER_COLLECTION = '@gopizza:users';

export const AuthContext = createContext({} as AuthContexData);

function AuthProvide({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLogging, setIsLogging] = useState(false);

    async function signIn(email: string, password: string) {
        if (!email || !password) {
            Alert.alert('Login', 'Informe o e-mail e a senha');
        }
        setIsLogging(true);
        auth().signInWithEmailAndPassword(email, password)
            .then(account => {
                firestore()
                    .collection('users')
                    .doc(account.user.uid)
                    .get()
                    .then(async (profile) => {
                        const { name, isAdmin } = profile.data() as User;

                        if (profile.exists) {
                            const userData = {
                                id: account.user.uid,
                                name,
                                isAdmin
                            };

                            await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
                            setUser(userData);
                        }
                    })
                    .catch(() => Alert.alert('Login', 'Não foi possível buscar os dados de perfil do usuário'));
            })
            .catch(error => {
                const { code } = error;
                if (code === 'auth/user-not-found' || code === 'auth/wrong-password')
                    return Alert.alert('Login', 'E-mail e/ou senha inválida.');
                else
                    return Alert.alert('Login', 'Não foi possível realizar o login.');
            })
            .finally(() => setIsLogging(false));

    }

    async function signOut() {
        await auth().signOut();
        await AsyncStorage.removeItem(USER_COLLECTION);
        setUser(null);

    }

    async function loadUserStogareData() {
        setIsLogging(true);
        const storedUser = await AsyncStorage.getItem(USER_COLLECTION);

        if (storedUser) {
            const userData = JSON.parse(storedUser) as User;
            console.log(userData);
            setUser(userData);
        }

        setIsLogging(false);
    }

    async function forgotPassword(email: string) {
        if (!email)
            return Alert.alert('Redefinir senha', 'Informe o e-mail');

        auth()
            .sendPasswordResetEmail(email)
            .then(() => Alert.alert('Rerefinir senha', 'Enviamos um link no seu e-mail para redefinir sua senha'))
            .catch(() => Alert.alert('Redefinir senha', 'Não foi possível enviar o e-mail para redefinir a senha.'));

    }

    useEffect(() => {
        loadUserStogareData();
    }, []);

    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            forgotPassword,
            isLogging,
            user
        }} >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvide, useAuth };