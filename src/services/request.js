import * as axios from "axios";
import {apiBaseUrl, getEnv, newsFeedApiBaseUrl} from "../utils/helper/helperFunctions";

const API_BASE_URL = "http://lottery-api.test/api/v1";
/**
 * This handles all the api request. If REACT_APP_ENV = mock-api, then the data
 * is faked and returned as async promise object using mock data.
 *
 * To know what type of data is expected by the application, look at the mock data.
 *
 * @param type
 * @param url
 * @param userData
 */
const requests = (type, url, userData = {}) => {
    if (getEnv('ENV') === 'mock-api') {
        // return mockApi(type, url, userData = {});
    } else {
        return axios({
            method: type,
            url: url,
            data: userData,
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
    }
};

/**
 * Handles all Auth related requests
 */
const Auth = {
    login: (data) =>
        requests('POST', API_BASE_URL + "/login", data),
    logout: () =>
        requests('PUT', API_BASE_URL + "/logout"),
    register: (data) =>
        requests('POST', API_BASE_URL + "/register", data),
    save: (data) =>
        requests('PUT', apiBaseUrl("/user"), data),
    forgotPassword: (data) =>
        requests('POST', API_BASE_URL + "/forgot-password", data),
    resetPassword: (data) =>
        requests('PUT', API_BASE_URL + "/reset-password", data),
    sendVerificationEmail: () =>
        requests('GET', apiBaseUrl("/user/send-verification-email")),
    verifyEmail: (data) =>
        requests('POST', apiBaseUrl("/user/verify-email"), data),
    checkIfExists: (data) =>
        requests('POST', apiBaseUrl("/user/check-if-exists"), data),
    loginSocialUser: (url) =>
        requests('GET', apiBaseUrl(url)),
};

/**
 * Handles all Business related requests
 */
const Users = {
    all: (query) =>
        requests('GET', API_BASE_URL + "/users?" + query),
    get: (id) =>
        requests('GET',API_BASE_URL + `/users/${id}`),
    create: (data) =>
        requests('POST', API_BASE_URL + "/users", data),
    update: (data) =>
        requests('PUT', API_BASE_URL + "/users/" + data.id, data),
    updateMultiple: (data) =>
        requests('PUT', API_BASE_URL + "/users", data),
    deleteMultiple: (data) =>
        requests('DELETE', API_BASE_URL + "/users", data),
};

/**
 * Handles all Permissions related requests
 */
const Permissions = {
    all: (query) =>
        requests('GET', API_BASE_URL + "/permissions?" + query),
    get: (id) =>
        requests('GET',API_BASE_URL + `/permissions/${id}`),
    create: (data) =>
        requests('POST', API_BASE_URL + "/permissions", data),
    update: (data) =>
        requests('PUT', API_BASE_URL + "/permissions/" + data.id, data),
    deleteMultiple: (data) =>
        requests('DELETE', API_BASE_URL + "/permissions", data),
};

/**
 * Handles all Business related requests
 */
const Roles = {
    all: (query) =>
        requests('GET', API_BASE_URL + "/roles?" + query),
    get: (id) =>
        requests('GET',API_BASE_URL + `/roles/${id}`),
    create: (data) =>
        requests('POST', API_BASE_URL + "/roles", data),
    update: (data) =>
        requests('PUT', API_BASE_URL + "/roles/" + data.id, data),
    deleteMultiple: (data) =>
        requests('DELETE', API_BASE_URL + "/roles", data),
};

/**
 * Handles all Lottery related requests
 */
const Lottery = {
    slots: {
        all: (query) =>
            requests('GET', API_BASE_URL + "/lottery/slots?" + query),
        get: (data) =>
            requests('GET',API_BASE_URL + `/lottery/slots/${data.id}?` + data.query),
        getWinners: (data) =>
            requests('GET',API_BASE_URL + `/lottery/slots/winners?` + data.query),
        create: (data) =>
            requests('POST', API_BASE_URL + "/lottery/slots", data),
        update: (data) =>
            requests('PUT', API_BASE_URL + "/lottery/slots/" + data.id, data),
        deleteMultiple: (data) =>
            requests('DELETE', API_BASE_URL + "/lottery/slots", data),
    }
};


/**
 * Handles all Business related requests
 */
const Business = {
    get: () =>
        requests('GET', apiBaseUrl("/user/business")),
    getStatus: () =>
        requests('GET', apiBaseUrl("/user/business/status")),
    save: (data) =>
        requests('PUT', apiBaseUrl("/user/business"), data),
};

/**
 * Handles all Business Category related requests
 */
const BusinessCategory = {
    all: () =>
        requests('GET', apiBaseUrl("/business-categories")),
};

/**
 * Handles all Level related requests
 */
const Level = {
    all: () =>
        requests('GET', apiBaseUrl("/levels?with=sections")),
};

/**
 * Handle all Business Option related requests
 */
const BusinessOption = {
    all: () =>
        requests('GET', apiBaseUrl(`/business-options`)),
    get: (id) =>
        requests('GET', apiBaseUrl(`/business-option/${id}`)),
    save: (data) =>
        requests('POST', apiBaseUrl(`/business-option/${data.id}`), data.input)
};

/**
 * Handle all News related requests
 */
const News = {
    all: () =>
        requests('GET', newsFeedApiBaseUrl("/wp-json/mbj-feed/v1/posts")),
    byTag: (tag) =>
        requests('GET', newsFeedApiBaseUrl(`/wp-json/mbj-feed/v1/posts?tag=${tag}`))
};

/**
 * Handle all News related requests
 */
const Track = {
    click: (data) =>
        requests('GET', apiBaseUrl('/click?bo_id=' + data.boId + '&aff_id=' + data.affId)),
};

/**
 * Handle all News related requests
 */
const AppSettings = {
    all: (data) =>
        requests('GET', apiBaseUrl('/app-settings')),
};


export default {
    Auth,
    Users,
    Permissions,
    Roles,
    Lottery,
    Business,
    BusinessCategory,
    Level,
    BusinessOption,
    News,
    Track,
    AppSettings
};
