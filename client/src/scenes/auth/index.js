import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            employeeID: null,
            companyCode: null
        }



    }

    handlePress = () => {

        const { socket } = this.props
        try {
            console.log(this.state)
            socket.emit('Mobile-register', this.state)
            console.log('pressed')
            this.props.history.push('/Home');
            console.log('emitted')
        }
        catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputFields} onChangeText={(name) => this.setState({ name })} />
                <TextInput style={styles.inputFields} onChangeText={(employeeID) => this.setState({ employeeID })} />
                <TextInput style={styles.inputFields} onChangeText={(companyCode) => this.setState({ companyCode })} />
                <TouchableOpacity style={styles.submit} onPress={this.handlePress}>
                    <Text style={styles.submitText}>Join</Text>
                </TouchableOpacity>
            </View>
        );
    }
}