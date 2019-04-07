import React from 'react';
import { View, Text, FlatList, Image,AsyncStorage } from 'react-native';
import styles from './styles'
import Shift from '../../components/shift'

import axios from 'axios';

let SERVER_URL = "http://00d4e500.ngrok.io";

let func;

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shifts: [
                { department: 'Grocery', time: '5:00PM - 10:00PM', status: 'Working', date: 'Sept 22nd, 2019', },
                { department: 'Grocery', time: '5:00PM - 10:00PM', status: 'Working', date: 'Sept 22nd, 2019', },
                { department: 'Grocery', time: '5:00PM - 10:00PM', status: 'Working', date: 'Sept 22nd, 2019', },
                { department: 'Grocery', time: '5:00PM - 10:00PM', status: 'Working', date: 'Sept 22nd, 2019', },
                { department: 'Grocery', time: '5:00PM - 10:00PM', status: 'Working', date: 'Sept 22nd, 2019', },
                { department: 'Grocery', time: '5:00PM - 10:00PM', status: 'Working', date: 'Sept 22nd, 2019', },
                { department: 'Grocery', time: '5:00PM - 10:00PM', status: 'Working', date: 'Sept 22nd, 2019', },
                { department: 'Grocery', time: '5:00PM - 10:00PM', status: 'Working', date: 'Sept 22nd, 2019', },
                { department: 'Grocery', time: '5:00PM - 10:00PM', status: 'Working', date: 'Sept 22nd, 2019', },
                { department: 'Grocery', time: '5:00PM - 10:00PM', status: 'Working', date: 'Sept 22nd, 2019', },
                { department: 'Grocery', time: '5:00PM - 10:00PM', status: 'Working', date: 'Sept 22nd, 2019', },

            ],
            user: { name: 'John' }
        }


    }

    async componentDidMount(){
        let id = AsyncStorage.getItem("id");
        
        let schedules = await axios.post(SERVER_URL+"/schedule/readOne",{employeeID:id})

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


    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    height: '8%',
                    width: '100%',
                     // backgroundColor: '#E7ECEF',
                }}>
                    <Image style={{ width: 120, height: 35, marginTop: 30, marginLeft: 30 }} source={{ uri: 'https://cdn.discordapp.com/attachments/399368683828281346/564258531361161235/geoschdlr.PNG' }} />
                </View>
                <FlatList
                    containerStyle={styles.container}
                    data={this.state.shifts}
                    renderItem={({ item }) => <Shift data={item} />} />
                <View style={{ height: '6%', width: '100%', backgroundColor: 'white', position: 0 }}>

                </View>
            </View>
        )
    }
}