import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SubscribedList from '../../components/subscribed-list/subscribed-list';
import PrayersList from '../../components/prayers-list/prayers-list';

// import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
// import {RootStackParamList} from '../../navigation/navigation';

import {Badge} from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

const Column: React.FC = () => {
  // const navigation = useNavigation();
  // const route = useRoute<RouteProp<RootStackParamList, 'Column'>>();
  // const {columnName} = route.params;

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#72A8BC',
        inactiveTintColor: '#C8C8C8',
        indicatorStyle: {
          backgroundColor: '#72A8BC',
        },
        labelStyle: {fontSize: 13, lineHeight: 16, fontWeight: 'bold'},
        tabStyle: {flexDirection: 'row-reverse'},
        showIcon: true,
        showLabel: true,
      }}>
      <Tab.Screen
        name="prayers"
        component={PrayersList}
        options={{tabBarLabel: 'MY PRAYERS'}}
      />
      <Tab.Screen
        name="subscribed"
        component={SubscribedList}
        options={{
          tabBarLabel: 'SUBSCRIBED',
          tabBarIcon: () => (
            <Badge
              visible={true}
              style={{backgroundColor: '#AC5253', fontSize: 9}}>
              3
            </Badge>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Column;