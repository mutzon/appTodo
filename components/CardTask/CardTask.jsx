import { Image, Text, View } from 'react-native';

import { TouchableOpacity } from 'react-native';

export function CardTask({ todo, onPress, onLongPress }) {
    return <TouchableOpacity style={{
        shadowColor: "#000",
        paddingHorizontal: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "white",
        height: 115,
        borderRadius: 13,
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    }} onPress={() => onPress(todo)}
        onLongPress={() => onLongPress(todo)}>
        <Text style={[{ fontSize: 25 }, todo.isCompleted && { textDecorationLine: "line-through" }]}>{todo.title}</Text>
        {todo.isCompleted && <Image source={require("../../assets/check.png")} style={{
            height: 25, width: 25,

        }} resizeMode="contain" />}
    </TouchableOpacity>
}
