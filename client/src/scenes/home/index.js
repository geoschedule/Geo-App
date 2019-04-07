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
            shifts: null,
            user: { name: 'John' },
            employeeID: null
        }
        const{socket} = this.props;
        
        socket.on('Mobile-clockIn', (day) => {
            let copy = this.state.shifts;

            let newState = copy.map(shift => {
                if (shift.day == day)
                    shift.working = true
            })

            this.setState({shifts:newState})
            
        })

        socket.on('Mobile-clockOut', (day) => {
            let copy = this.state.shifts;

            let newState = copy.map(shift => {
                if (shift.day == day)
                    shift.working = false
            })

            this.setState({shifts:newState})
            
        })
    }

    async componentDidMount(){
        let employeeID = await AsyncStorage.getItem("id");
        this.setState({employeeID});
        console.log('finding schedule')
        let schedulesPre = await axios.post(SERVER_URL+"/schedule/readOne",{employeeID})
        // console.log(schedules.data)
        let {schedules} = schedulesPre.data;
        console.log(schedules)

        let days = ["friday","saturday","sunday","monday","tuesday","thursday","wednesday"]
        let arr = []

        for (let entry in schedules){
            if(days.includes(entry)){
                let {startTime,endTime} = schedules[entry]
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
        this.setState({shifts:arr})

        func = setInterval(()=>{
            this.sendLocation()
          }, 3000)
    }

    getCurrentPosition = (options = {}) => {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      };

    sendLocation = async () => {
        const{socket} = this.props;
        let {employeeID} = this.state;
        let location = await this.getCurrentPosition();
        let format = {
            location,
            employeeID
        }
        socket.emit('Mobile-sendLocation',format);
        console.log('emmitted')
    }

    formatTime= (time) =>{
        time = time+':00:00'
        time = time.split(':'); // convert to array
    
        // fetch
        var hours = Number(time[0]);
        var minutes = Number(time[1]);
    
        // calculate
        var timeValue;
    
        if (hours > 0 && hours <= 12) {
          timeValue= "" + hours;
        } else if (hours > 12) {
          timeValue= "" + (hours - 12);
        } else if (hours == 0) {
          timeValue= "12";
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
                    renderItem={({ item }) => <Shift data={item}  />} />
                <View style={{ height: '6%', width: '100%', backgroundColor: 'white', position: 0 }}>

                </View>
            </View>
        )
    }
}