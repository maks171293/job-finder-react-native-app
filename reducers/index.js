import {combineReducers} from 'redux';
import auth from './auth_reducers';
import jobs from './job_reducers';
import likedJobs from './likes_reducers';

export default combineReducers({
    auth, jobs, likedJobs
});
