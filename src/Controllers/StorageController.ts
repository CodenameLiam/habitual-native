import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeValue = async (key: string, value: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log(`${key} successfully saved as ${value}`);
    } catch (e) {
        console.error(e);
    }
};

export const getValue = async (key: string): Promise<string | undefined> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.error(e);
    }
};

export const storeData = async (key: string, value: any): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error(e);
    }
};

export const getData = async (key: string): Promise<string | undefined> => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e);
    }
};
