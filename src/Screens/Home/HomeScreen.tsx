import { AppContext } from 'Context/AppContext';
import moment from 'moment';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';

// Creates constant day text/number values
const prevDates = [...Array(6).keys()].reverse().map(day => moment().subtract(day, 'day'));
const prevDateNumbers = prevDates.map(date => date.format('D'));
const prevDateText = prevDates.map(date => date.format('ddd').toUpperCase());

const HomeScreen: React.FC = () => {
    console.log(prevDateNumbers);
    console.log(prevDateText);

    const { habits } = useContext(AppContext);

    return (
        <View>
            <Text></Text>
        </View>
    );
};

export default HomeScreen;
