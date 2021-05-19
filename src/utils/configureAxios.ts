import Axios from 'axios';

export const axiosLogInterceptor = () => {
    // axios log
    Axios.interceptors.response.use(
        (response) => {
            if (__DEV__) {
                console.log(`${response.config.url}: `, response);
            }

            return response;
        },
        (error) => {
            if (__DEV__) {
                console.log(`${error.config.url}: `, { error });
            }

            // if (error.response?.status === 401 && rootStore.account.isLoggedIn) {
            //     rootStore.account.logout();

            //     if (onLogout) {
            //         onLogout();
            //     }

            //     Alert.alert('Session Over', 'Please login again, to continue your activity.');
            // }

            return Promise.reject(error);
        },
    );
};

export const axiosGlobalOptions = (accessToken: string | null) => {
    // set default headers Accept
    Axios.defaults.headers.common.Accept = 'application/json';

    // set default headers access token
    if (accessToken !== null) {
        Axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        delete Axios.defaults.headers.common.Authorization;
    }
};
