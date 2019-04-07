import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styles from './styles'
import Shift from '../../components/shift'


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