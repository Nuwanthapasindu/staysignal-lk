import bcrypt from 'bcryptjs';

const COST = 12;

export const hashPassword = (plain) => bcrypt.hash(plain, COST);

export const comparePassword = (plain, hash) => bcrypt.compare(plain, hash);
