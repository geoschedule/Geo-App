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
                <Text style={styles.date}>{this.props.data.day}</Text>
                <Text style={styles.time}>{this.props.data.time}</Text>
                <View style={styles.status}>
                    <Text style={styles.date}>Status: {this.props.data.working ? 'working' : 'not working'}</Text>
                </View>
            </View>
        );
    }
}