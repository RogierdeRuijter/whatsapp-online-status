import { writable } from "svelte/store";

export const signedStore = writable(false);
export const genericErrorStore = writable(false);
export const alreadySignedErrorStore = writable(false);

export const addSquareCheckedStore = writable(false);
export const addCircleCheckedStore = writable(false);
export const addFlagCheckedStore = writable(false);
