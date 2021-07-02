import { storeValue } from 'Controllers/StorageController';
import { ONBOARDED_KEY } from 'Hooks/useStorage';

const onboardingReducer = (state: boolean, action: boolean): boolean => {
    storeValue(ONBOARDED_KEY, action.toString());
    return action;
};

export default onboardingReducer;
