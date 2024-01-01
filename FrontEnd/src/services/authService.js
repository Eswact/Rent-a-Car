import { getlocalstorage } from '../scripts/common.js';
export function isLoggedIn() {
    const user = getlocalstorage('user');
    return user !== null;
}