import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default class Login extends React.Component {

    handlePress = () => {
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Date</Text>
                <Text>Department</Text>
            </View>
        );
    }
}