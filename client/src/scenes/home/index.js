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
    gotoSignIn = () => {
        this.props.history.push('/');
    }

    async componentDidMount() {
        let id = AsyncStorage.getItem("id");

        let schedules = await axios.post(SERVER_URL + "/schedule/readOne", { employeeID: id })

        func = setInterval(() => {
            this.sendLocation()
        }, 5000)
    }

    getCurrentPosition = (options = {}) => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    };

    sendLocation = async () => {
        const { socket } = this.props;
        let location = await this.getCurrentPosition();
        socket.emit('Mobile-sendLocation', location);
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
                    renderItem={({ item }) => <Shift data={item} />}
                    keyExtractor={(item, index) => index.toString()} />

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={this.gotoSignIn}>
                        <Image style={{ width: 30, height: 30, }} source={{
                            uri: 'https://png.pngtree.com/svg/20140905/d5ef0bdd9e.png'
                        }} />
                        < Text style={{ alignSelf: 'center' }}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton} onPress={this.gotoSignIn}>
                        <Image style={{ width: 30, height: 30, }} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8AAAC9vb3x8fGurq7b29uAgID39/f8/Pzi4uLs7OyysrJ3d3fU1NTp6ek0NDSnp6fMzMzDw8NdXV1lZWUxMTHS0tKhoaFXV1eOjo5vb29BQUGbm5tISEgICAhPT08aGhqSkpIqKiqHh4cjIyNDQ0MyMjIcHBwTExNra2s6Ojp0dHRv+MCkAAALLUlEQVR4nNWdaUMaMRCGEeRQTrnUVlFAq9X////KIWVh551MJpNkeT62ks3s5pgrk1otPu3BXXfZ6k2fh6vXxdXidTV8nvZay/rdbTvB0yNzO36arK4ws79Pd43cnVRzc/3NyFbgs9cd5O6sN+1670Mm3g+r1riTu9NyGt0HL+kOTOuXMS/rOvF+hLzL3X0Xg8cA8XZ8PlV55WlOQ+Xb8X2TWxDA3bOJfFsm/dzCEMzt5NvJ2Mwt0Bn9F1P5tkyrNFZv/5rLt6VVmc1jGUW+LaPcou2Y+ykvfnxVYKj2Isq3ZZlZvv5nZAGvroZZP2OwBiPiOpt8ja8kAm42x0xmx10i+TZ8ZBmpT+kE3NBNL2CcTR7zmFi+jq0WKuFXUgEbb94dXDwXLePJu7+ILwkFHPh17fmxvrUUbgr/tNE4O83u+rdXO1/J9NQbd2f+8+v6/zLYLPzzwY7vNEceE3qVSMSmuyt7Pltz9LsTT8WdWPP7TOLhkA7R73OnEpRww1jo/3hL8BVvRT0ZdstqCCdhrdYeiWyUYXT1pr0QdONlTv2Ul3DDeCho+z2ufLWaoBPPpHwCCWUyTuIJt8Xt7f0Yo98WJYTTqesWcR1HtD3uRY/xO3QKf8Y8YxnyjFCuXc9+uOV+fhwA39yfDZx+u2je1L7ryXX+90dNgX0RgjcZaVtsOx774NyrDhal8xsMZvyjvmwkOscxeJ4ETXTuJ78n95ItzTHjo6w2I/6Z1mExx6IaIQrHq9sz+5nR5HULe92GnRlRTDfeCJ1aP471yvy1ftqeDmsmQ81CB2tQxPMvsL6SdI/q2T7qBE5LbFk+iFvYqC846PeNDDluoFoGUZnHlGd8Z7lbBWc2znjG2ng2ecAOJjxRfsr8/yo/s8h04gxSs8WGMevfStvSvPjfFiIyi9yrQfM7GA2qpEI3Tl+AxeOZ+IhRVIr5hGXd6SxZz2SdvccdsGi+VvsF2y/rvyX7w2Sq4D3DxBjG84CwYcojykJhxXbbwqD1Wgs2T6wjZQPERGUdwz4YRN3w+6NGCGFimQwkmItrsJYtUdu/qb+mlB+L+G2HaHdPuKEIN1xSZ6Im7Sq4DzVGb3wIbRnOAKD3UvEyExUZ6v6hWgVcqIFmPaf+1sLlACNeEv8QQwO1e49+sfZ4HV7AOGNYs0idYPYh6niFRawB7sthIwTZLoxCSLqsLLYMtGMEaYbQwcb9iHQ7GlgZ8COGNLoEbcJZuINanYYh3fgBxYlDdF/kz+NXDlINMvBSo7hJwDBFdpOrSXITNdgyUKagvkWkSDhdQJTNvAj3UqPAgl4vBANfEPmJs2UgK4BfFjj0DZKLcLilA165WjdFe4Vk5SdVheAtow56pJ0AYBrKwpNUtDE4sImGqXYiAiVCpuqSnQlOEp3QXdL63EAevtCZTm4ZoTkGIMKv3BHBkBA7f2JsGUBzUxrZwCKTBwtfg34tb/NKu+eDESEf8+QrenufPgYcagbOW91SQ9qyXjEtHDh+1NrE4LU7MnkAwIHh8/6ZwKpy+QPat86VQVu/XmYQdIJcaQ/CgOVPtZgCF6VfW0gJ2b0rlYj0UqPyrIP37zkecFhHGcOl93zVdgFGvKdB3eFym3vd6zL1PvttwfqnGQ/AFwwSgCHizP4Ca6a/YDHVrM1gCjkSJ8ssFSIu8P5GupwV3apBg7r1w6PYK6E6yH5uaI3XP88FE1uj8C5dnZgJ3xu32ODGT5poOg/jarxAghOwoumNA2MsRYeA4IyHxqMIFq0ior1Rs9RcnW4lgnGuUdsEEoo+IrfpcxxbkJxD0viAcPz+iMTxIjhBQXJcTnEU/4gmMCL5hhKjJVxCyZFqjUMx9yg9ts3p7wc033DpblYUvlauNMVECOB/KqJZaRy5+Rs+Re24jmkAikuH4CNqdgvn6JoIdUFV7a9TM3TgPBit2fHB/D5obSOxnqSaiOf60vx+/9g1cOJqHDXAp6/wzPvL94afAow6jW0B5o9iOHjvF5yVTY8I2ZJwDl2zUqM8oJm4HtcJeGce7b/TpXzT/dKEHsBwUDlX6IRlXdoVbVyoTuOQmqUuL5OOdOuyWejpo0t3bJRdk8qTNmSnlBEfsJgqk37PR4TOS406pXShW76uzUgtziDRKUsKeinVJnjS6qA+LaAzXk6e3196o4DjPLQ9oM3vpNP2Ip/4d0AvNMohj6wC0x57AvYd9YEAurmctUXpaajPgKDTV3LW+aM9k/oECHpHnLl/GA16VPlGGo4AyzNfIUNg0QW0SFeqCswdD4BWSkOShOn9wuQAhQr6E4bkdQJfrH7chwEMzaAcHXqYRjp/74T21rClYJwAh1uesulAAwlLPgaraZ4tETihAlsFDgiTHnsC3nZoviOIiuQoQw3CDMG7MzidZ9FlP8AnDK/fBt6c3krUAs7MhyePo2Tv1BXhUT8MmgbZd6aVRQSAJc+iYBQKO6S9ngH1wuSSIZCWa3FWSwxK6LBxqaBAYkoTA509tCn5BRNi0l1DhSL5VlYOiugnG6fwHVvVMYf5LFHrbBZAcXyTqhg74DFqrZ/SD5gQb6d24HSKFFMRp9MY1t2D6R7lKkrm4LQ9SxsOVy41rLdFw6RRmyqOOGMktkcD3xJia4YziU0xS+6xZ1KMdX8m7SemDs481tqTwtUQjvcVudRZc/ONy56LVPySre5p7wxjUwyDC/1QtLlLaCPUoIVVKXYMI1TZ5Z4XxYviyLa2jpvyqWK6LC8XjsRvibnYvn/4mooMAke16zgKsSsV9sW5uv0syK9ObfaGnYLx7DbnHVaON/t/nC8c78L5oGh36jpv75iyXT9u36xheeO8QSjK0r1DkCjKHO8tjnLmIYLTSBHD7IIrRP7AEWR1g0dUNdF5/8MW+pYZ0S0sdcedCI7XY4Hs+ql38myAU8KuYwX9IW7cS3J8ZcvbqPyieQlvl8KmY6fzyG897J1rOeyNVoJjMT9ET5PwuBv3Yy26law99rmP1vxOhBKSo3LFDo34m+X6T57HhBMkScjH04GHZb3ZKN0OeNvvrv3viUwRLJFdvFZmdnLDo/8VkTvSpGOlvWL1lES5rbJtKwZx/XpHQFmDBCRLHoDVtSOT7lJg5bHQUFJeJqs9vRyGprqHGlU1j0DSpiZrN8UAUifQM7dqRCJt/k4NZQ/HI1XOwBGfi50NMLmxxpO0ylvyMbpF5FMxInWe4J6E4zTHGN2yTCZhtuNyfxIJmH4dPZBonOYao1vS7PtZ1tEDzqoqBuQ80ZlEPyVvXUqIts6VnKQ2E4W/c9GPdHY9IrK9n/f0/x5JNTU9qQ+ukEiK82kxvtZYSzz/aR6Fu0w01Sbfkepz3MXrdOQ7+F8izpZhdFOsCco6szzxY6E+RAhlfMY/BuCFIM/Hk5xFYkisvYv5im8gjK2MeKlremyjNZXQ1s7xyRlxES29MgxBXp+Q4HuhImE2FaMfplLjmU0EqeQk3COpkO2mcjthEf8kpzLpC1L4IM3OZKiC34IjWEF9rZg6WmYZKGFWB7eMsDSNHKV9fAlyL+aqIuaH8qqALX9y912I3tOf3YMvRauDV1TfpsBHzDmqZ/RiVKtNtTxPLkTHh06pjvtXBrgAjuFiVpkDvqvNBa0yB/xC/NU2KGi8VptINQsi46HbJK2MZohct8lT8dUAqVPjAiwmhMypUaUomi8dyQGuqoSydQhcqFX3y7hw5qIkqBYWGVf64sUpa2V49S1XeXdTONdU/qw1E3BMKtWJydh00LmF6saYfGnThXqHF7+MFqBSii7TnoCUE8PS1D5NSOepOFRXl+C996c5ar2sVrOH1nXKlLx/aTuM2CYeVI4AAAAASUVORK5CYII=' }} />
                        <Text style={{ alignSelf: 'center' }}>Clock In</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}