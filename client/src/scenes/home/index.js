import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles'
import Shift from '../../components/shift'

let func;

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

    async componentDidMount(){
        func = setInterval(()=>{
            this.sendLocation()
          }, 5000)
    }

    getCurrentPosition = (options = {}) => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      };

    sendLocation = async () => {
        const{socket} = this.props;
        let location = await this.getCurrentPosition();
        socket.emit('Mobile-sendLocation',location);
        console.log('emmitted')
    }


    // this.props.socket to access socket
    render() {
       this.sendLocation();
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.shifts}
                    renderItem={({ item }) => <Shift />} />
            </View>
        )
    }
}