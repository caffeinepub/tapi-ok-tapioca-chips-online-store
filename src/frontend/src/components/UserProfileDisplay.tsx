import { Avatar, AvatarFallback } from './ui/avatar';
import { User } from 'lucide-react';

interface UserProfileDisplayProps {
  name: string;
  className?: string;
  showName?: boolean;
}

export default function UserProfileDisplay({ name, className = '', showName = true }: UserProfileDisplayProps) {
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Avatar className="h-10 w-10 border-2 border-brand/30 bg-gradient-to-br from-brand/20 to-brand/5 transition-all duration-300 hover:scale-110 hover:border-brand/50">
        <AvatarFallback className="bg-transparent text-brand font-bold text-lg">
          {firstLetter || <User className="h-5 w-5" />}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="text-xs font-medium text-foreground/80 max-w-[80px] truncate">
          {name}
        </span>
      )}
    </div>
  );
}
