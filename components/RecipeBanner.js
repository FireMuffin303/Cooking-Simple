import { View , Text, TouchableOpacity, ToastAndroid,StyleSheet,Image} from "react-native";

export const RecipeBanner = ({item,navigation}) =>{
  const id = item.id
    return(
        <TouchableOpacity onPress={()=>{navigation.navigate("Menu",{id})}}>
            <View style={style.card}>
                <Image style={style.image} source={{uri:item.imgUri}}/>
                <View style={{flexDirection:"row",alignItems:"center",marginHorizontal:10}}>
                  <Image style={style.avatar} source={{uri:item.user.avatar}}></Image>
                  <View style={{flexDirection:"column"}}>
                    <Text style={{fontSize: 22,color:'#ffffff',fontWeight:"bold"}}> {item.name} </Text>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Text style={{color:'#ffffff',marginHorizontal:2}}>{item.user.displayName}</Text>

                        
                    </View>
                    

                  </View>

                  

                  <View style={style.content}>
                  </View>
                </View>
            </View>
          </TouchableOpacity>
    );
  }

function showToast(id){
    ToastAndroid.show("ID : "+id,ToastAndroid.SHORT);
}

const style = StyleSheet.create({
  card:{
    flexDirection:"column",
    alignItems:'center',
    margin: 10,
    marginHorizontal:20,
    padding:6,
    backgroundColor:"#9CA777",
    borderRadius : 4
  },
  image: {
    width: "95%",
    height: 150,
    borderRadius: 8,
    margin: 8,
  },
  content: {
    flexDirection:'row',
    flex: 1,
    padding: 8,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginRight: 8,
    
  }
  
});