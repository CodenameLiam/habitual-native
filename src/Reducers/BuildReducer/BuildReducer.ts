import produce from 'immer';
import { HabitObject } from 'Types/Habit.types';
import { BuildAction } from './BuildReducer.types';

const buildReducer = produce((state: HabitObject, action: BuildAction) => {
    switch (action.type) {
        case 'INIT':
            state = action.payload;
            break;
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
        case 'DAY':
            state.schedule[action.day] = action.payload;
            break;
    }
    return state;
});

export default buildReducer;