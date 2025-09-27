import { Users, Chrome as Home } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { switchRole } from '../../store/slices/authSlice';

export const RoleSwitcher = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (!isAuthenticated || !user) return null;

  const handleRoleSwitch = () => {
    const newRole = user.role === 'renter' ? 'host' : 'renter';
    dispatch(switchRole(newRole));
  };

  return (
    <div className="flex items-center space-x-2">
      <Badge variant={user.role === 'host' ? 'default' : 'secondary'}>
        {user.role === 'host' ? 'Hosting' : 'Renting'}
      </Badge>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRoleSwitch}
        className="h-8 px-2"
      >
        {user.role === 'renter' ? (
          <Home className="h-4 w-4 mr-1" />
        ) : (
          <Users className="h-4 w-4 mr-1" />
        )}
        Switch to {user.role === 'renter' ? 'Host' : 'Rent'}
      </Button>
    </div>
  );
};