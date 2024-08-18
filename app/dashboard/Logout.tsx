import { LogOutIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

import { logout } from './signout.action';

const Logout = () => {
  return (
    <form action={logout} className="flex h-full">
      <Button variant="ghost" className="w-full justify-start self-end">
        <LogOutIcon className="mr-2 size-4" />
        Logout
      </Button>
    </form>
  );
};

export default Logout;
