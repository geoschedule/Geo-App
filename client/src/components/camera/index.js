import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraView extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    async snapPhoto() {
        console.log('Button Pressed');
        if (this.camera) {
            console.log('Taking photo');
            const options = {
                quality: 1, base64: true, fixOrientation: true,
                exif: true
            };
            await this.camera.takePictureAsync(options).then(photo => {
                photo.exif.Orientation = 1;
                console.log(photo);
            });
        }
    }
    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }}ref={ref => { this.camera = ref; }}  type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                                alignItems: 'space-between'

                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: .5,
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 30, color: 'white', }}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: '5%', }} onPress={this.snapPhoto.bind(this)}>
                                <Image style={{ width: 80, height: 80 }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Clips_iOS_10_App_Shutter_Icon.png' }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 0.5,
                                  alignItems: 'flex-end',
                                }}
                                onPress={() => {
                                    this.props.history.push('/Profile');
                                }}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 30, color: 'white' }}>
                                    {' '}Cancel{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}