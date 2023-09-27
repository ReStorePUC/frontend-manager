/* eslint-disable no-unused-vars */
import { useState } from "react";

const adminKey = "ReStore_Manager"

export const getValue = () => {
  try {
    const value = window.localStorage.getItem(adminKey);
    if (value) {
      return JSON.parse(value);
    }
  } catch (err) {
    return null;
  }
}

export const setValue = (newValue) => {
  try {
    window.localStorage.setItem(adminKey, JSON.stringify(newValue));
  } catch (err) {}
};
