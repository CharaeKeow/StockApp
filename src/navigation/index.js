import React from 'react';
import { AuthUserProvider } from '../firebase/context';
import Routes from './Routes';

export default function Providers() {
  return (
    <AuthUserProvider>
      <Routes />
    </AuthUserProvider>
  );
}
