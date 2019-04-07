import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import styles from './styles'
import Shift from '../../components/shift'

import axios from 'axios';

let SERVER_URL = "http://00d4e500.ngrok.io";

let func;

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shifts: null,
            user: { name: 'John' },
            employeeID: null
        }
        const { socket } = this.props;

        socket.on('Mobile-clockIn', (day) => {
            let copy = this.state.shifts;

            let newState = copy.map(shift => {
                if (shift.day == day)
                    shift.working = true
            })

            this.setState({ shifts: newState })

        })

        socket.on('Mobile-clockOut', (day) => {
            let copy = this.state.shifts;

            let newState = copy.map(shift => {
                if (shift.day == day)
                    shift.working = false
            })

            this.setState({ shifts: newState })

        })
    }
    gotoSignIn = () => {
        this.props.history.push('/');
    }
    gotoProfile = () => {
        this.props.history.push('/Profile');
    }

    async componentDidMount() {
        let employeeID = await AsyncStorage.getItem("id");
        this.setState({ employeeID });
        console.log('finding schedule')
        let schedulesPre = await axios.post(SERVER_URL + "/schedule/readOne", { employeeID })
        // console.log(schedules.data)
        let { schedules } = schedulesPre.data;
        console.log(schedules)

        let days = ["friday", "saturday", "sunday", "monday", "tuesday", "thursday", "wednesday"]
        let arr = []

        for (let entry in schedules) {
            if (days.includes(entry)) {
                let { startTime, endTime } = schedules[entry]
                let start = this.formatTime(startTime);
                let end = this.formatTime(endTime);
                let time = `${start}-${end}`
                let format = {
                    day: entry,
                    time,
                    working: false
                }

                arr.push(format);
            }

        }
        this.setState({ shifts: arr })

        func = setInterval(() => {
            this.sendLocation()
        }, 3000)
    }

    getCurrentPosition = (options = {}) => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    };

    sendLocation = async () => {
        const { socket } = this.props;
        let { employeeID } = this.state;
        let location = await this.getCurrentPosition();
        let format = {
            location,
            employeeID
        }
        socket.emit('Mobile-sendLocation', format);
        console.log('emmitted')
    }

    formatTime = (time) => {
        time = time + ':00:00'
        time = time.split(':'); // convert to array

        // fetch
        var hours = Number(time[0]);
        var minutes = Number(time[1]);

        // calculate
        var timeValue;

        if (hours > 0 && hours <= 12) {
            timeValue = "" + hours;
        } else if (hours > 12) {
            timeValue = "" + (hours - 12);
        } else if (hours == 0) {
            timeValue = "12";
        }

        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
        timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

        return timeValue
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
                    renderItem={({ item }) => <Shift data={item} />}
                    keyExtractor={(item, index) => index.toString()} />

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={this.gotoSignIn}>
                        <Image style={{ width: 30, height: 30, }} source={{
                            uri: 'https://png.pngtree.com/svg/20140905/d5ef0bdd9e.png'
                        }} />
                        < Text style={{ alignSelf: 'center' }}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton} onPress={this.gotoProfile}>
                        <Image style={{ width: 30, height: 30, }} source={{ uri: 'data:image/png;base64,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' }} />
                        <Text style={{ alignSelf: 'center' }}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}