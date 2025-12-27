
// Authentication Utility using LocalStorage
const USERS_KEY = 'circuit_sage_users';
const CURRENT_USER_KEY = 'circuit_sage_current_user';

export const auth = {
    // Register a new user
    register: (userData) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        if (users.find(u => u.email === userData.email)) {
            throw new Error('User already exists');
        }
        users.push(userData);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return userData;
    },

    // Login a user
    login: (email, password, role) => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find(u => u.email === email && u.password === password && u.role === role);
        if (!user) {
            throw new Error('Invalid credentials or role');
        }
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return user;
    },

    // Get currently logged in user
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null');
    },

    // Logout
    logout: () => {
        localStorage.removeItem(CURRENT_USER_KEY);
    }
};
