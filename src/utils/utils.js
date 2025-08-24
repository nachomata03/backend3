import bcrypt from 'bcrypt';

export const createHash = async (password) => bcrypt.hash(password, 10); //hashea la constraseña

export const isValidPassword = async (user, password) => bcrypt.compareSync(password, user.password);
