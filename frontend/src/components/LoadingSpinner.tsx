export default function LoadingSpinner({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizeClasses = {
    small: 'h-8 w-8',
    default: 'h-16 w-16',
    large: 'h-24 w-24',
  };

  return (
    <div className="flex items-center justify-center">
      <img
        src="/assets/generated/chips-breaking-animation.dim_400x400.png"
        alt="Loading..."
        className={`${sizeClasses[size]} animate-spin`}
        style={{ animationDuration: '1.5s' }}
      />
    </div>
  );
}
