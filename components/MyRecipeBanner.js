import { StyleSheet, TouchableOpacity, View } from "react-native"
import { RecipeBanner } from "./RecipeBanner"
import MyButton from "./MyButton"
import { Ionicons } from "@expo/vector-icons"
import { useMemo, useState } from "react"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase"

const MyRecipeBanner =({item,navigation}) =>{
    const id = item.id
    async function deleteRecipe(){
        await deleteDoc(doc(db,"Recipes",id)).then(
            alert("ลบรายการสำเร็จ")
        )
    }

    function editRecipe(){
        navigation.navigate("Edit",{id})
    }

    return(
        <View>
            <RecipeBanner item={item} navigation={navigation}/>
            
            <TouchableOpacity style={styles.button} onPress={() =>{
                editRecipe()
                }}>
                <MyButton
                icon= {<Ionicons name="pencil" color={"white"} size={30}/>}
                text ="แก้ไขรายการนี้"
                color ="#ffa93b"
                />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() =>{
                deleteRecipe()
                }}>
                <MyButton
                icon= {<Ionicons name="trash" color={"white"} size={30}/>}
                text ="ลบรายการนี้"
                color ="#ff6060"
                />
            </TouchableOpacity>

            
            <View style={styles.header}/>
        </View>
    )
}

export default MyRecipeBanner

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F97B22',
      },
    button:{
        marginHorizontal:15,
        marginTop : 15
    }
})