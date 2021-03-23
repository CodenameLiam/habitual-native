import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
    createStackNavigator,
    GestureHandlerRefContext,
    StackNavigationOptions,
    StackNavigationProp,
    TransitionPresets,
} from '@react-navigation/stack';
import { AppParamList, TabNavProps } from './types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TabNavigation from './TabNavigation';
import Icon from 'Components/Icon';

const Stack = createStackNavigator<AppParamList>();

const CreateScreen: React.FC<any> = ({ navigation }) => {
    const [scrolledTop, setScrolledTop] = useState(true);
    // const scrolledTopRef = useRef(true);
    const onScroll = useCallback(({ nativeEvent }) => {
        const scrolledTop = nativeEvent.contentOffset.y <= 0;
        setScrolledTop(scrolledTop);
        // console.log(scrolledTop);
        // scrolledTopRef.current = scrolledTop;
    }, []);

    useEffect(() => {
        navigation.setOptions({
            gestureResponseDistance: scrolledTop ? Dimensions.get('screen').height : 135,
        });
        return () => {
            navigation.setOptions({
                gestureResponseDistance: Dimensions.get('screen').height,
            });
        };
    }, [navigation, scrolledTop]);

    return (
        <GestureHandlerRefContext.Consumer>
            {ref => (
                <ScrollView
                    waitFor={scrolledTop ? ref : undefined}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={{ padding: 100 }}>Ass and tiddies</Text>
                    <Text style={{ padding: 100 }}>Ass and tiddies</Text>
                    <Text style={{ padding: 100 }}>Ass and tiddies</Text>
                    <Text style={{ padding: 100 }}>Ass and tiddies</Text>
                    <Text style={{ padding: 100 }}>Ass and tiddies</Text>
                </ScrollView>
            )}
        </GestureHandlerRefContext.Consumer>
    );
};

const styles = StyleSheet.create({
    headerTitle: { fontFamily: 'Montserrat-Bold', fontSize: 20 },
});

const TabHeader = (navigation: TabNavProps): StackNavigationOptions => ({
    headerBackground: () => <View />,
    headerLeft: () => (
        <TouchableOpacity style={{ paddingLeft: 8 }} onPress={() => navigation.navigate('Create')}>
            <Icon family="feather" name="chevron-left" size={36} colour={'black'} />
        </TouchableOpacity>
    ),
    headerRight: () => (
        <TouchableOpacity style={{ paddingRight: 25 }} onPress={() => navigation.navigate('Create')}>
            <Icon family="entypo" name="plus" size={38} colour={'black'} />
        </TouchableOpacity>
    ),
});

const AppNavigation: React.FC = () => {
    return (
        <Stack.Navigator
            mode="modal"
            screenOptions={{
                gestureEnabled: true,
                cardOverlayEnabled: true,
                gestureResponseDistance: Dimensions.get('screen').height,
                headerTitleStyle: styles.headerTitle,
                headerTitleAlign: 'center',
                ...TransitionPresets.ModalPresentationIOS,
            }}
        >
            <Stack.Screen name="Tabs" component={TabNavigation} options={({ navigation }) => TabHeader(navigation)} />
            <Stack.Screen name="Create" component={CreateScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigation;
