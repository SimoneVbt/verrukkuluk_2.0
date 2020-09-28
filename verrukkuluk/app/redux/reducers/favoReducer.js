import { ADD_FAVOURITE, DELETE_FAVOURITE } from "../actions/types";

const initialState = {
    favourites: []
}

const dishReducer = (state = initialState, action) => {

    switch(action.type) {

        case ADD_FAVOURITE:
            return Object.assign({}, state, {
                favourites: action.favourites
            });

        case DELETE_FAVOURITE:
            return;

        default:
            return state;
    }

}

export default dishReducer;