import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children, userId }) => {
  const [theme, setTheme] = useState('light');
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    if (userId) {
      // Lấy cài đặt từ Local Storage theo userId
      const savedTheme = localStorage.getItem(`${userId}_theme`);
      const savedBackgroundImage = localStorage.getItem(`${userId}_backgroundImage`);

      if (savedTheme) {
        setTheme(savedTheme);
        document.body.setAttribute('data-theme', savedTheme);
      } else {
        document.body.removeAttribute('data-theme'); // Reset to default if no theme is found
      }

      if (savedBackgroundImage) {
        setBackgroundImage(savedBackgroundImage);
        document.body.style.backgroundImage = `url(${savedBackgroundImage})`;
      } else {
        document.body.style.backgroundImage = ''; // Reset to default if no background image is found
      }
    } else {
      // Nếu không có userId (người dùng đã đăng xuất), reset theme và background image
      setTheme('light');
      setBackgroundImage('');
      document.body.removeAttribute('data-theme');
      document.body.style.backgroundImage = '';
    }
  }, [userId]);

  const changeTheme = (newTheme) => {
    if (userId) {
      setTheme(newTheme);
      localStorage.setItem(`${userId}_theme`, newTheme);
      document.body.setAttribute('data-theme', newTheme);
    }
  };

  const changeBackgroundImage = (image) => {
    if (userId) {
      setBackgroundImage(image);
      localStorage.setItem(`${userId}_backgroundImage`, image);
      document.body.style.backgroundImage = `url(${image})`;
    }
  };

  const saveSettings = () => {
    alert('Settings have been saved successfully!');
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, backgroundImage, changeBackgroundImage, saveSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};
