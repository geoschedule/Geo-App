import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default class Shift extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ['Current', 'Worked', 'Upcoming', 'Missed'],
            currentStarus: '',
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Date</Text>
                <Text>Department</Text>
                <Text>Time</Text>
                <Text>currentStatus</Text>
            </View>
        );
    }
}