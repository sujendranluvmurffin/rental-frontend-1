import { useState } from 'react';
import { User, UserCheck } from 'lucide-react';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { switchRole } from '../../store/slices/authSlice';

export const RoleSwitcher = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleRoleSwitch = (role: 'renter' | 'host') => {
    dispatch(switchRole(role));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          {user.role === 'host' ? <UserCheck className="h-4 w-4" /> : <User className="h-4 w-4" />}
          {user.role === 'host' ? 'Host' : 'Renter'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={() => handleRoleSwitch('renter')}
          className={user.role === 'renter' ? 'bg-accent' : ''}
        >
          <User className="h-4 w-4 mr-2" />
          Renter Mode
          {user.role === 'renter' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleRoleSwitch('host')}
          className={user.role === 'host' ? 'bg-accent' : ''}
        >
          <UserCheck className="h-4 w-4 mr-2" />
          Host Mode
          {user.role === 'host' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};