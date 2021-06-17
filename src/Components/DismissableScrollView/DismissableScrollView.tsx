// DismissableFlatList.js

import React, { useState, useEffect, useRef, useCallback } from 'react';

import { GestureHandlerRefContext } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native';

export const DEFAULT_GESTURE_RESPONSE = 135;
interface DismissableScrollViewProps {
    navigation: any;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

const DismissableScrollView: React.FC<DismissableScrollViewProps> = ({
    children,
    navigation,
    contentContainerStyle,
}) => {
    const [scrolledTop, setScrolledTop] = useState(true);
    const mountRef = useRef(false);

    const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>): void => {
        const scrolledTop = event.nativeEvent.contentOffset.y <= 0;
        setScrolledTop(scrolledTop);
    }, []);

    useEffect(() => {
        if (mountRef.current) {
            navigation.setOptions({
                gestureResponseDistance: scrolledTop ? Dimensions.get('screen').height : DEFAULT_GESTURE_RESPONSE,
            });
        } else {
            mountRef.current = true;
        }
    }, [navigation, scrolledTop]);

    return (
        <GestureHandlerRefContext.Consumer>
            {ref => (
                <ScrollView
                    style={{ flexGrow: 1 }}
                    contentContainerStyle={contentContainerStyle}
                    waitFor={scrolledTop ? ref : undefined}
                    onScroll={onScroll}
                    scrollEventThrottle={32}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            )}
        </GestureHandlerRefContext.Consumer>
    );
};

export default DismissableScrollView;
