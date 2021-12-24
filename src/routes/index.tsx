import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { UserStackRoutes } from "./user.stack.routes";
import { UserTabRoutes } from "./user.tab.routes";
import { SignIn } from "@screens/SignIn";
import { useAuth } from "@hooks/auth";

export function Routes() {
    const { user } = useAuth();
    return (
        <NavigationContainer>
            { user?.id ? <UserStackRoutes /> : <SignIn />}
        </NavigationContainer>
    )
}