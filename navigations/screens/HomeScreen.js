import {View,Text, ScrollView,TouchableOpacity,StyleSheet} from 'react-native'
import {useState, useEffect} from 'react'
import { RecipeBanner } from '../../components/RecipeBanner';
import SearchInput from '../../components/SearchBox';
import { db } from '../../firebase';
import { getDocs, collection, query, where, onSnapshot } from 'firebase/firestore';

export default function HomeScreen({navigation}){
    const [projectData,setProjectData] = useState([])
 
    async function getRecipe(){
      const q = query(collection(db,"Recipes"), where("status",'==',"publish"))
      const unsubscribe = onSnapshot(q,(querySnapshot) =>{
        const docs =[];
        querySnapshot.docs.map((doc) =>{
          docs.push({id:doc.id,...doc.data()})
        })
        setProjectData(docs)
      })
    }

    useEffect(() =>{
      getRecipe()

    },[])
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() =>{
            navigation.navigate("Search")
          }}>
            <SearchInput/>
          </TouchableOpacity>
          <Text style={styles.menuHeader}>รายการแนะนำ</Text>
        <ScrollView>
          
          {projectData.map((item) =>{
              return  <RecipeBanner item={item} navigation={navigation}></RecipeBanner>
            })
          }
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEE8B0',
  },
  menuHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  menuItem: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemImage: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 20,
  },
  menuItemText: {
    fontSize: 16,
  },
  menuList: {
    paddingHorizontal: 16,
  },
});