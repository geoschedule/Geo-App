import React from 'react';
import { View, TouchableOpacity, Text, Image, AsyncStorage } from 'react-native';
import styles from './styles';
import axios from 'axios';
let SERVER_URL = "http://00d4e500.ngrok.io"

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        state = {

        };

    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    gotoCamera = () => {
        this.props.history.push('/CameraView');
    }
    gotoHome = () => {
        this.props.history.push('/Home');
    }
    gotoSignIn = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Image style={{ width: '40%', height: 160 }} source={{ uri: 'data:image/png;base64,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' }} />
                    <Text style={{ marginTop: 20 }}>John Doe</Text>
                    <Text style={{ marginTop: 20 }}>Employee ID</Text>
                    <Text style={{ marginTop: 20 }}>Job Title</Text>
                    <Text style={{ marginTop: 20 }}>Department</Text>
                    <TouchableOpacity style={{ alignSelf: 'center', marginTop: 60 }} onPress={this.gotoCamera}>
                        <Image style={{ width: 30, height: 30, alignSelf: 'center' }} source={{
                            uri: 'data:image/png;base64,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'
                        }} />
                        < Text >Update Picture</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={this.gotoSignIn}>
                        <Image style={{ width: 30, height: 30, }} source={{
                            uri: 'https://png.pngtree.com/svg/20140905/d5ef0bdd9e.png'
                        }} />
                        < Text style={{ alignSelf: 'center' }}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton} onPress={this.gotoHome}>
                        <Image style={{ width: 30, height: 30, }} source={{ uri: 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX14768833.jpg' }} />
                        <Text style={{ alignSelf: 'center' }}>Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}