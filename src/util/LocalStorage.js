import {useState, useEffect} from "react";

/**
 * @description Retrieves a value from localStorage. Returns value found @ key. Otherwise, returns defaultValue.
 * @param {string} key
 * @param {any} defaultValue
 * @returns {any}
 */
const getStorageValue = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved);
    return initial || defaultValue;
};

/**
 * @description Custom React hook integrating React State Management with Local Storage.
 * @param {string} key
 * @param defaultValue
 * @returns {[*,((value: *) => void)]}
 */
export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};