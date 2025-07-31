import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    input: {
        borderWidth: 1, 
        borderColor: '#cccccc', 
        marginBottom: 10, 
        padding: 8, 
        borderRadius: 5 
    },
    buttonWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#219EBC'
    },
    buttonIcon: {
        marginRight: 16,
        color: '#219EBC'
    },
    buttonWithIconText: {
        fontSize: 16,
        color: '#219EBC'
    },
    buttonDeleteIcon: {
        color: '#dc3545'
    },
    error: {
        flex: 1, 
        justifyContent: 'center', 
        textAlign: 'center', 
        marginTop: 20 
    },
    checkboxItem: {
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    textAndInput: {
        marginVertical: 6,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    mainContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    editContainer: {
        flex: 1,
        padding: 16,
        alignItems: 'center'
    },
    inputRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    smallText: {
        fontSize: 12,
        color: '#abb2bf'
    },
    cardView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        gap: 16,
    },
    boldText: {
        fontWeight: 'bold'
    }
});