import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ListScreen from "../screens/ListScreen";
import { Image } from 'react-native';
import HomeIcon from '../../assets/images/home.png'; // 로컬 이미지 경로
import ProfileIcon from '../../assets/images/profile.png'; // 로컬 이미지 경로
import ChattingIcon from '../../assets/images/chatting.png';

const Tab = createBottomTabNavigator();

const Navigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let iconSource;


                        if (route.name === '홈') {
                            iconSource = focused ? HomeIcon : HomeIcon; // 필요에 따라 수정

                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        } else if (route.name === '채팅') {
                            iconSource = focused ? ChattingIcon : ChattingIcon; // 필요에 따라 수정

                            iconName = focused ? 'ios-list' : 'ios-list-outline';
                        } else if (route.name === '프로필') {
                            iconSource = focused ? ProfileIcon : ProfileIcon; // 필요에 따라 수정

                            iconName = focused ? 'ios-list' : 'ios-list-outline';
                        }

                        // You can return any component that you like here!
                        return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="홈" component={ListScreen} options={{ headerShown: false }}/>
                <Tab.Screen name="(미정)" component={SettingsScreen} />
                <Tab.Screen name="채팅" component={SettingsScreen} />
                <Tab.Screen name="프로필" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
