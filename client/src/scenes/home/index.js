import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles'



export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shifts: [
                { department: 'Grocery', time: '', isClockedIn: false, duration: 0, },
                { department: 'Grocery', time: '', isClockedIn: false, duration: 0, },
                { department: 'Grocery', time: '', isClockedIn: false, duration: 0, },
                { department: 'Grocery', time: '', isClockedIn: false, duration: 0, },
                { department: 'Grocery', time: '', isClockedIn: false, duration: 0, }],
            user: { name: 'John' }
        }
    }

 // this.props.socket to access socket
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.shifts}
                    renderItem={({ item }) => <Text style={{ color: 'red' }}>{item.department}{this.props.hello}</Text>} />
            </View>
        )
    }
}