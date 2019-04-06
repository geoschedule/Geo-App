import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default class Login extends React.Component {

    handlePress = () => {
        try {
            this.props.navigation.navigate('Home'), { socket };
        }
        catch{
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Getting data</Text>
            </View>
        );
    }
}