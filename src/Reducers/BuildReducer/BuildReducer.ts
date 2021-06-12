import produce from 'immer';
import { HabitObject } from 'Types/Habit.types';
import { BuildAction } from './BuildReducer.actions';

const buildReducer = produce((state: HabitObject, action: BuildAction) => {
    console.log(action.payload);
    switch (action.type) {
        case 'NAME':
            state.name = action.payload;
            break;
        case 'TOTAL':
            state.total = action.payload;
            break;
        case 'COLOUR':
            state.colour = action.payload;
            break;
        case 'SCHEDULE':
            state.schedule = action.payload;
            break;
        case 'ICON':
            state.icon = action.payload;
            break;
        case 'DAY':
            state.schedule[action.day] = action.payload;
            break;
    }
    return state;
});

export default buildReducer;
