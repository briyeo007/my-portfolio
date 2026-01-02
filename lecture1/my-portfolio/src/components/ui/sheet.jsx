import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

/**
 * Sheet 컴포넌트
 * 모바일 네비게이션용 사이드 시트
 */
const SheetContext = React.createContext({});

const Sheet = ({ open, onOpenChange, children }) => {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
};

const SheetTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { onOpenChange } = React.useContext(SheetContext);
  return (
    <button
      ref={ref}
      className={cn('', className)}
      onClick={() => onOpenChange?.(true)}
      {...props}
    >
      {children}
    </button>
  );
});
SheetTrigger.displayName = 'SheetTrigger';

const SheetContent = React.forwardRef(
  ({ className, children, side = 'right', ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(SheetContext);

    if (!open) return null;

    const sideClasses = {
      right: 'right-0 h-full w-3/4 max-w-sm',
      left: 'left-0 h-full w-3/4 max-w-sm',
      top: 'top-0 w-full',
      bottom: 'bottom-0 w-full',
    };

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0"
          onClick={() => onOpenChange?.(false)}
        />
        {/* Sheet */}
        <div
          ref={ref}
          className={cn(
            'fixed z-50 gap-4 bg-card p-6 shadow-lg transition ease-in-out animate-in',
            side === 'right' && 'slide-in-from-right',
            side === 'left' && 'slide-in-from-left',
            sideClasses[side],
            className
          )}
          {...props}
        >
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => onOpenChange?.(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          {children}
        </div>
      </>
    );
  }
);
SheetContent.displayName = 'SheetContent';

const SheetHeader = ({ className, ...props }) => (
  <div
    className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
SheetTitle.displayName = 'SheetTitle';

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle };
