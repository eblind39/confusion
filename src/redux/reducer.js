import { DISHES } from '../data/dishes';
import { COMMENTS } from '../data/comments';
import { LEADERS } from '../data/leaders';
import { PROMOTIONS } from '../data/promotions';

export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    leaders: LEADERS,
    promotions: PROMOTIONS,
};

export const Reducer = (state = initialState, action) => {
    return state;
};