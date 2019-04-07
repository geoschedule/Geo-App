import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20

    },
    header: {
        height: 80,
        width: '90%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    logoutButton: {
        marginTop: '1%',
        width: '42%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }, footer: {
        height: '6%',
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#939393'
    }


})