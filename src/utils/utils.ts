import { Alert, Platform, ToastAndroid } from 'react-native';

export const toast = (msg: string | { message: string }, title: any = null) => {
    const message = typeof msg !== 'string' ? msg.message : msg;

    if (Platform.OS === 'ios') {
        Alert.alert(title, message);
    } else {
        ToastAndroid.show(message, ToastAndroid.LONG);
    }
};

export const handleError = (error: any, delayShowMessage = false) => {
    let msg = "Don't Worry, Please try again.";

    // error is instance new error
    if (error.message) {
        msg = error.message;
    }

    // display message if error from server
    if (error.response && error.response.data) {
        const { message, error: err } = error.response.data;

        // use message if there are
        if (message && message !== '') {
            msg = message;
        }

        // use specific errors for form
        if (err?.message) {
            msg = `${msg}: ${err.message}`;
        } else if (typeof err === 'string') {
            msg = `${msg}: ${err}`;
        } else {
            msg = Object.keys(err)
                .slice(0, 1)
                .reduce((acc, val) => {
                    const keys = Object.keys(err[val]);

                    return `${msg}: ${val} ${keys[0]}`;
                }, '');
        }
    }

    if (delayShowMessage) {
        setTimeout(() => toast(msg, 'Attention'), 1500);
    } else {
        toast(msg, 'Attention');
    }
};

export const parseUrl = (url: string, data: string[] | string) => {
    if (typeof data === 'string') {
        return url.replace(/{\w*}/gi, data);
    }

    let iterator = 0;
    return url.replace(/{\w*}/gi, () => data[iterator++]);
};

export const findFileName = (uri: string) => {
    const uriSplitted = uri.split('/');

    return uriSplitted[uriSplitted.length - 1];
};

export const castToBoolean = (val: any): boolean => {
    if (val === '0' || val === 0 || !val) {
        return false;
    }

    return true;
};

export const constructDate = (date: string): Date => {
    try {
        return new Date(date.replace(' ', 'T'));
    } catch (errorParse) {
        if (__DEV__) {
            console.log('PARSE_DATE_ERROR: ', { errorParse });
        }

        return new Date();
    }
};

export const findIdInUrl = (url: string): number => {
    const split = url.split('/');
    const id = split[split.length - 2];

    return Number(id);
};
