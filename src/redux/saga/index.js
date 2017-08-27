import {take, put, all} from 'redux-saga/effects';
import {SEND_TO_API, SEND_TO_API_FAILED, SEND_TO_API_SUCCESS} from '../actions/actionTypes';
import request, {POST} from '../../services/request';

export function *sendFormSaga() {
    while (true) {
        try {
            const {payload} = yield take(SEND_TO_API);
            console.log(payload);
            const response = yield request(POST, 'http://localhost:9123/email_addresses', payload);
            yield put({type: SEND_TO_API_SUCCESS, payload: response});
        } catch (e) {
            console.error(e);
            yield put({type: SEND_TO_API_FAILED, error: e});
        }
    }
}
export default function *rootSaga() {
    yield all([
        sendFormSaga(),
    ]);
}
