import { StyleSheet, Text, View } from "react-native"

const MyButton = (props) =>{
    return(
        <View style={{
            flexDirection: "row",
            backgroundColor:props.color,
            borderRadius:30,
            padding:10,
            paddingHorizontal:25
        }}>
            {props.icon}
            <Text style={{alignSelf:"center",justifyContent:"center", color:"#FFFFFF",marginHorizontal:10}}>{props.text}</Text>
          </View>
    )
}

export default MyButton;

const styles = StyleSheet.create({
    button_style:{
        flexDirection: "row",
        backgroundColor:"#F09540",
        borderRadius:30,
        padding:10,
        paddingHorizontal:25
      }
})