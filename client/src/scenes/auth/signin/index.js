import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import styles from './styles';
export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'John Doe',
            password: '*********',

        }



    }
    handlePress = () => {

        // const { socket } = this.props
        // try {
        //     console.log(this.state)
        //     socket.emit('Mobile-register', this.state)
        //     console.log('pressed')
        this.props.history.push('/Home');
        //     console.log('emitted')
        // }
        // catch (e) {
        //     console.log(e)
        // }
    }
    gotoSignUp = () => {
        this.props.history.push('/Login');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={{ width: '82%', height: 90, marginBottom: 60 }} source={{ uri: 'https://cdn.discordapp.com/attachments/399368683828281346/564258531361161235/geoschdlr.PNG' }} />
                <TextInput style={styles.inputFields}
                    placeholder="000-000-0000"
                    placeholderTextColor="white"
                    onChangeText={(name) => this.setState({ name })} />
                <TextInput style={styles.inputFields}
                    placeholder="**********"
                    placeholderTextColor="white"
                    onChangeText={(password) => this.setState({ password })} />
                <TouchableOpacity style={styles.submit} onPress={this.handlePress}>
                    <Text style={styles.submitText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpButton} onPress={this.gotoSignUp}>
                    <Text style={{ alignSelf: 'flex-end' }}>Register</Text>
                </TouchableOpacity>
            </View>
        );
    }
}