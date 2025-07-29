import React from 'react';
import AuthContext from './AuthContext';

export default function AutherProvider({children}) {
  const [auth, setAuth] = React.useState(null);
  const [token, setToken] = React.useState(null);

  return (
    <AuthContext.Provider value={{auth, setAuth, token, setToken}}>
      {children}
    </AuthContext.Provider>
  )
}
