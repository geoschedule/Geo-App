import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image,AsyncStorage } from 'react-native';
import styles from './styles';

import axios from 'axios';

let SERVER_URL = "http://00d4e500.ngrok.io";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'John Doe',
            employeeID: '000000',
            companyID: '000000'
        }



    }
    handlePress = async () => {

        const { socket } = this.props
        try {
            console.log(this.state)
            await AsyncStorage.setItem("id",this.state.employeeID)
            socket.emit('Mobile-register', this.state)
            console.log('pressed')
            await axios.post(SERVER_URL+"/user",this.state)
            this.props.history.push('/Home');
            console.log('emitted')

        }
        catch (e) {
            console.log(e)
        }
    }
    gotoSignIn = () => {
        this.props.history.push('/');
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={{ width: '82%', height: 90, marginBottom: 60 }} source={{ uri: 'https://cdn.discordapp.com/attachments/399368683828281346/564258531361161235/geoschdlr.PNG' }} />
                <TextInput style={styles.inputFields}
                    placeholder="John Doe"
                    placeholderTextColor="white"
                    onChangeText={(name) => this.setState({ name })} />
                <TextInput style={styles.inputFields}
                    placeholder="000-000-0000"
                    placeholderTextColor="white"
                    onChangeText={(employeeID) => this.setState({ employeeID })} />
                <TextInput style={styles.inputFields}
                    placeholder="000-000-000-0000"
                    placeholderTextColor="white"
                    onChangeText={(companyCode) => this.setState({ companyCode })} />

                <TouchableOpacity style={styles.submit} onPress={this.handlePress}>
                    <Text style={styles.submitText}>Join</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={this.gotoSignIn}>
                    <Text style={{ alignSelf: 'flex-end' }}>← Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }
}