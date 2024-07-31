import * as React from 'react';

import { cn } from '@/lib/utils';

export interface ToggleCustomProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const ToggleCustom = React.forwardRef<HTMLInputElement, ToggleCustomProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={cn(
          'relative inline-flex cursor-pointer items-center',
          className
        )}
      >
        <input
          id="switch"
          type="checkbox"
          className="peer sr-only"
          ref={ref}
          {...props}
        />
        <label htmlFor="switch" className="hidden"></label>
        <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
      </label>
    );
  }
);
ToggleCustom.displayName = 'ToggleCustom';

export { ToggleCustom };
