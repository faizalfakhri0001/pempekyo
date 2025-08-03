/** @format */

'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Keluar
    </Button>
  );
}
