import { writable } from 'svelte/store';

export const signedStore = writable(false);
export const errorStore = writable(false);
