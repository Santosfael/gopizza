import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";

import firestore from '@react-native-firebase/firestore';

import { BottomMenu } from "@components/BottomMenu";
import { Orders } from "@screens/Orders";
import { Home } from "@screens/Home";

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {
    const [ notifications, setNotifications ] = useState('0');
    const { COLORS } = useTheme();

    useEffect(() => {
        const subscribe = firestore()
        .collection('orders')
        .where('status', '==', 'Pronto')
        .onSnapshot(querySnapshopt => {
            setNotifications(String(querySnapshopt.docs.length));
        });

        return () => subscribe();

    },[]);

    return (
        <Navigator
            screenOptions={{
                tabBarActiveTintColor: COLORS.SECONDARY_900,
                tabBarInactiveTintColor: COLORS.SECONDARY_400,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                }
            }}
        >
            <Screen 
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <BottomMenu title="Cardápio" color={color} />
                    )}
                }
            />

            <Screen 
                name='orders'
                component={Orders}
                options={{
                    tabBarIcon: ({ color }) => (
                        <BottomMenu title="Pedidos" color={color} notifications={notifications} />
                    )}
                }
            />
        </Navigator>
    )
}