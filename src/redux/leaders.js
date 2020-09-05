import * as ActionTypes from './ActionTypes';

//* Update the code in leaders.js to respond to the dispatched 
//* Redux actions and update the Redux store and appropriately 
//* handle the loading and errors.
export const Leaders = (state = {
                            isLoading: true,
                            errMess: null,
                            leaders: []
                        }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_LEADERS:
            return {...state, isLoading: false, errMess: null, leaders: action.payload}
        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []}
        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, leaders: []}
        default:
            return state;
    }
}