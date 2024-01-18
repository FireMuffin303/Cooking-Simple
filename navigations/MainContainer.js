import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import AccountScreen from "./screens/AccountScreen";
import AddScreen from "./screens/AddScreen";
import { Ionicons } from '@expo/vector-icons';

import EditScreen from "./screens/EditScreen";
import OtherAccountScreen from "./screens/OtherAccountScreen";


const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return(
    
            <Tab.Navigator
                screenOptions={({route}) =>({
                    tabBarStyle: {
                        backgroundColor: '#F09540',
                    }
                })}

                tabBarOptions={{
                    activeTintColor: '#FFC28A', // Change this to the desired active tab color
                    inactiveTintColor: 'white', // Change this to the desired inactive tab color
                  }}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    tabBarIcon:({color,size}) =>(
                        <Ionicons name="home" size={30} color={"white"}/>
                    )
                }}/>
                <Tab.Screen name="Add" component={AddScreen} options={{
                    tabBarIcon:({color,size}) =>(
                        <Ionicons name="ios-add" size={30} color={"white"}/>
                    )
                }}/>
                <Tab.Screen name="Account" component={AccountScreen} options={{
                    tabBarIcon:({color,size}) =>(
                        <Ionicons name="person" size={30} color={"white"}/>
                    )
                }}/>
                
            </Tab.Navigator>
            
       
    );
}