import React, { useEffect, useState } from 'react';
import { AppRoutes } from './views/AppRoutes';

//context létrehozása
export const UserContext = React.createContext({});

function App() {
  console.log(UserContext);

  const userState = useState(() => {
    const userInlocalStorage = localStorage.getItem('user');
    return userInlocalStorage ? JSON.parse(userInlocalStorage) : {};
  })

  useEffect(() => {
    console.log(userState[0]);
    localStorage.setItem('user', JSON.stringify(userState[0]))
  }, [userState]);

  return (
    <UserContext.Provider value={{ id: userState[0].id, user: userState[0], setUser: userState[1] }}>
      <AppRoutes />
    </UserContext.Provider>
  );
}

export default App;
