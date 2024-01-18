import { StyleSheet, Text, View } from 'react-native';
import MainContainer from './navigations/MainContainer';
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from "./navigations/screens/RegisterScreen";
import MyMenuScreen from "./navigations/screens/MyMenuScreen";
import HistoryMenuScreen from "./navigations/screens/HistoryMenuScreen";
import SearchScreen from "./navigations/screens/SearchScreen";
import MenuScreen from "./navigations/screens/MenuScreen";
import LoginScreen from "./navigations/screens/LoginScreen";
import EditScreen from "./navigations/screens/EditScreen";
import OtherAccountScreen from "./navigations/screens/OtherAccountScreen";
import { StatusBar } from 'expo-status-bar';
import ForgotPasswordScreen from './navigations/screens/ForgotPasswordScreen';
import EditUserScreen from './navigations/screens/EditUserScreen';
import { FavoriteScreen } from './navigations/screens/FavoriteScreen';
import AccountPage from './navigations/screens/AccountScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
   
    <NavigationContainer>
      <StatusBar hidden={false}/>
        <Stack.Navigator initialRouteName="Login"
          screenOptions={{
            headerShown : false
          }}
        >
          <Stack.Screen name="Register" component={RegisterScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Main" component={MainContainer}/>
          <Stack.Screen name="MyMenu" component={MyMenuScreen}/>
          <Stack.Screen name="Favorite" component={FavoriteScreen}/>
          <Stack.Screen name="History" component={HistoryMenuScreen}/>
          <Stack.Screen name="Search" component={SearchScreen}/>
          <Stack.Screen name="Menu" component={MenuScreen}/>
          <Stack.Screen name="Edit" component={EditScreen}/>
          <Stack.Screen name="otheraccount" component={OtherAccountScreen}/>
          <Stack.Screen name="ForgetPassword" component={ForgotPasswordScreen}/>
          <Stack.Screen name="EditUser" component={EditUserScreen}/>
          <Stack.Screen name="Account" component={AccountPage}/>

        </Stack.Navigator>
    </NavigationContainer>
  );
}


//<MainContainer styles={{backgroundColor:"#9CA777"}}/>
