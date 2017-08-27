import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const DEFAULT_STATE = {
    firstName: '',
    lastName: '',
    emailAddress: [],
};

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE': {
            return DEFAULT_STATE;
        }
        case actionTypes.CHANGE_FIRST_NAME: {
            return {
                ...state,
                firstName: action.payload,
            };
        }
        case actionTypes.CHANGE_LAST_NAME: {
            return {
                ...state,
                lastName: action.payload,
            };
        }
        case actionTypes.ADD_EMAIL: {
            return {
                ...state,
                emailAddress: state.emailAddress.concat([action.payload]),
            };
        }
        case actionTypes.REMOVE_EMAIL: {
            return {
                ...state,
                emailAddress: _.filter(state.emailAddress, email => email.id !== action.payload),
            };
        }
        case actionTypes.CHANGE_EMAIL: {
            return {
                ...state,
                emailAddress: state.emailAddress.map(email => email.id === action.payload.id ?
                    ({
                        ...email,
                        email: action.payload.email,
                    })
                    :
                    email
                ),
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;
