import { writable } from 'svelte/store';

export const signedStore = writable(false);
export const genericErrorStore = writable(false);
export const alreadySignedErrorStore = writable(false);
