import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image,AsyncStorage } from 'react-native';
import styles from './styles';
import axios from 'axios';

let SERVER_URL = "http://00d4e500.ngrok.io"

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeID: null,

        }



    }
    handlePress = async () => {
        const{employeeID} = this.state;
        try{
            console.log('sending login info')
            await AsyncStorage.setItem("id",employeeID)
            await axios.post(SERVER_URL+"/user/read",this.state)

            this.props.history.push('/Home');
        }catch(e){
            console.log(e);
        }
    
        
        
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
                    onChangeText={(employeeID) => this.setState({ employeeID })} />
                
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