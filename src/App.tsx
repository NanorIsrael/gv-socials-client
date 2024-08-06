import  { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';
import { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { useSelector } from 'react-redux';
import { iState } from './state';
import Navbar from './scenes/navbar';


function App() {
  const mode = useSelector((state: iState) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <>
      <div>
        <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          {/* <Navbar/> */}
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/home' element={<HomePage/>}/>
            <Route path='/profile/:userId' element={<ProfilePage />}/>
          </Routes>
        </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
