// src/validations.js

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Name validation regex (letters and spaces only)
const nameRegex = /^[A-Za-z\s]+$/;

export const validateEmail = (email) => {
  if (!email) {
    return "Email is required.";
  } else if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required.";
  } else if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return "";
};

export const validateName = (name) => {
  if (!name) {
    return "Name is required.";
  } else if (!nameRegex.test(name)) {
    return "Name should contain only letters and spaces.";
  } else if (name.length < 2) {
    return "Name must be at least 2 characters long.";
  }
  return "";
};
