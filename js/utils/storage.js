export const AppStorage = {
    get: (key) => {
        return JSON.parse(localStorage.getItem(key));
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove: (key) => {
        localStorage.removeItem(key);
    },
    clear: () => {
        localStorage.clear();
    },
    getSession: () => {
        return JSON.parse(sessionStorage.getItem('user'));
    },
    setSession: (user) => {
        sessionStorage.setItem('user', JSON.stringify(user));
    },
    removeSession: () => {
        sessionStorage.removeItem('user');
    },
    clearSession: () => {
        sessionStorage.clear();
    }
}