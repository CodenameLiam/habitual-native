import { AppContext } from 'Context/AppContext';
import { TabNavProps } from 'Navigation/Params';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface TrendScreenProps {
    navigation: TabNavProps;
}

const TrendsScreen: React.FC<TrendScreenProps> = ({ navigation }) => {
    const { habits } = useContext(AppContext);
    return (
        <View>
            {Object.values(habits).map(habit => (
                <TouchableOpacity
                    key={habit.id}
                    onPress={() =>
                        navigation.navigate('IndividualTrend', { id: habit.id, name: habit.name, colour: habit.colour })
                    }
                >
                    <Text>{habit.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default TrendsScreen;
