import PocketBase from 'pocketbase';

export const POCKET = new PocketBase(import.meta.env.POCKETBASE_URL);
