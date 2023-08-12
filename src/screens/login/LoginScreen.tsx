import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { LoginStackParams } from "../../stack/LoginStackScreen";



type Props =  NativeStackScreenProps<LoginStackParams, 'Login'>
const LoginScreen : React.FC<Props> = ({route, navigation}) => {

    return (
        <View>
            <Text>Hellow</Text>
        </View>
    )
}

export default LoginScreen