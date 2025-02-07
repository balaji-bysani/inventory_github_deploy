import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStateContext } from './contexts/ContextProvider';
import Login from "./Components/login/login";
//import Register from './Register/Register';
function App() {
  const { setCurrentColor, setCurrentMode, currentMode, currentColor, themeSettings, setThemeSettings, activeMenu } = useStateContext();
  const isHomePage = window.location.pathname === '/';
  const isLoginPage = window.location.pathname === '/login';
  const isSignupPage = window.location.pathname === '/signup';
  const [userstate, setUserState] = useState({});
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const mainContentStyle = {
    width: activeMenu && !isLoginPage && !isSignupPage && !isHomePage ? '85%' : '100%', // Adjust the width as needed
    marginLeft: activeMenu && !isLoginPage && !isSignupPage && !isHomePage ? '15%' : '0',
    transition: 'width 0.3s ease, margin-left 0.3s ease',// Add transition for smooth animation
  };

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
     <BrowserRouter>
      <div className='flex relative dark:bg-main-dark-bg'>
        <div className='fixed right-4 bottom-4' style={{zindex:"1000"}}>
  
        </div>
        <div
            style={mainContentStyle}
            className={
              isLoginPage || isSignupPage || isHomePage
                ? 'w-full min-h-screen flex-2 dark:bg-main-dark-bg bg-main-bg'
                : 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full'
            }
          >
            <Routes>
              <Route  path="/"
                  element={
                    (
                      <Login setUserState={setUserState} />
                    )
                  }> </Route>

                <Route path="/login" element={<Login setUserState={setUserState}></Login>}></Route>
                
            </Routes>
          </div>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
