import axios from 'axios';
import history from '../configuration/history';
import { getAccessToken, setAccessToken } from '../api';
import {
    CHECK_LOGGED_STATUS,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../constants';
import { getRandomString } from '../../helpers/getRandomString';

// TODO: move to config
const clientId = 'fab6013f6101e65a811c';
const scope = 'read:org';
const state = getRandomString();

// // Open the page in a new window, then redirect back to a page that calls our global `oauth2Callback` function.
// window.open(githubAuth.token.getUri())
export const getJWTtoken = (hash) => async dispatch => {
    const getParameterByName = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    const extractToken = (string) => {
        const param = 'access_token';
        const name = param.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp(name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(string);

        if (!results) return null;
        if (!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    const extractParameter = (hash, parameter, url) => getParameterByName(parameter, url);
    const code = extractParameter(hash, 'code');

    try {
        const response = await axios.post(
            `https://gw-staging.hellofresh.com/auth/github/token?client_id=${clientId}&code=${code}`
        );
        // extract access_token
        const accessToken = await extractToken(response.data);
        // set Authorization headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        const finalResponse = await axios.post(
            'http://ops-gateway002.staging.hellofresh.io:8081/login?provider=github',
        );
        // receive JWT token to use Janus-GW
        const JWTtoken = finalResponse.data.access_token;

        /**
         * [ ] 1. https://gw-staging.hellofresh.com/auth/github/token -> variable
         * [ ] 2. http://ops-gateway002.staging.hellofresh.io:8081 -> var
         * [x] 3. in HTML link (https://gw-staging.hellofresh.com/auth/github/authoraze) -> var
         * [v] 4. client_id,
         * [v] 5. scope,
         * [v] 6. state => Math.random().toString();
         * [x] 7. button for Github
         * [x] 8. remove fields
         * 9. THE END
         */

        console.log('ACCESS_TOKEN', JWTtoken);
        setAccessToken(JWTtoken);
        history.push('/');
        dispatch(getUserStatus());
    } catch (error) {
        console.log(error);
    }
};

export const checkLoggedStatus = () => ({
    type: CHECK_LOGGED_STATUS,
});

export const loginRequest = () => ({
    type: LOGIN_START,
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS,
});

export const loginFailure = () => ({
    type: LOGIN_FAILURE,
    payload: 'The login or password you entered is incorrect.'
});

export const authorizeThroughGithub = () => async dispatch => {
    window.location.href = `https://gw-staging.hellofresh.com/auth/github/authorize?response_type=code&state=${state}&client_id=${clientId}&scope=${scope}`;
};

export const getUserStatus = () => dispatch => {
    dispatch(checkLoggedStatus());

    if (getAccessToken()) {
        dispatch(loginSuccess());
    } else {
        history.push('/login');
    }
};

export const loginUser = userData => async dispatch => {
    dispatch(loginRequest());

    try {
        /*
        https://github.com/login/oauth/authorize?response_type=code&client_id=07d212d657ed8f988287
        */
        // const response = await client.post('login', userData);
        const testHeaders = {
            Accept: 'application/vnd.janus.v1+json',
        };
        const client2 = axios.create({
            baseURL: 'https://github.com/login/oauth',
            headers: testHeaders,
        });
        const response = await client2.get('authorize?response_type=code&client_id=07d212d657ed8f988287');
        // const response = await client.get('auth/github/authorize?response_type=code&client_id=07d212d657ed8f988287');
        // const response = await client.get('status');

        // setAccessToken(response.data.access_token);
        // history.push('/');
        // dispatch(getUserStatus());
    } catch (error) {
        dispatch(loginFailure());
        console.log('FETCH_ENDPOINT_ERROR', 'Infernal server error', error);
    }
};
