import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import styles from './styles';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'John Doe',
            employeeID: '000000',
            companyCode: '000000'
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
    gotoSignIn = () => {
        this.props.history.push('/');
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={{ width: 340, height: 90, marginBottom: 60 }} source={{ uri: 'https://cdn.discordapp.com/attachments/399368683828281346/564258531361161235/geoschdlr.PNG' }} />
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
                    <Text >← Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }
}