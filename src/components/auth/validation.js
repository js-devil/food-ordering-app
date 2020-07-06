export const validateName = (value) =>
  /^([0-9]|[a-z])+([0-9a-z]+)$/i.test(value) && value.length >= 4;
// /^[a-zA-Z]+$/.test(value) && value.length >= 4;
export const validatePassword = (value) =>
  /^([0-9]|[a-z])+([0-9a-z]+)$/i.test(value) && value.length >= 6;
export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePhone = (value) =>
  /^\d+$/.test(value) && value.length === 11;
