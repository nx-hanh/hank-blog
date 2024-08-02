'use client';
import * as React from 'react';
import { CaretSortIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  options: Option[];
  value?: string[] | string;
  onChange?: (values: string[] | string) => void;
  placeholder?: string;
  inputPlaceholder?: string;
  emptyPlaceholder?: string;
  className?: string;
  multiple?: boolean;
}

const SelectBox = React.forwardRef<HTMLInputElement, SelectBoxProps>(
  (
    {
      inputPlaceholder,
      emptyPlaceholder,
      placeholder,
      className,
      options,
      value,
      onChange,
      multiple,
    },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSelect = (selectedValue: string) => {
      if (multiple) {
        const newValue =
          value?.includes(selectedValue) && Array.isArray(value)
            ? value.filter((v) => v !== selectedValue)
            : [...(value as string[]), selectedValue];
        onChange?.(newValue);
      } else {
        onChange?.(selectedValue);
        setIsOpen(false);
      }
    };

    const handleClear = () => {
      onChange?.(multiple ? [] : '');
    };

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              'data-[state=open]:border-ring flex min-h-[36px] cursor-pointer items-center justify-between rounded-md border px-3 py-1',
              className
            )}
          >
            <div
              className={cn(
                'items-center gap-1 overflow-hidden text-sm',
                multiple
                  ? 'flex grow flex-wrap '
                  : 'inline-flex whitespace-nowrap'
              )}
            >
              {value && value.length > 0 ? (
                multiple ? (
                  options
                    .filter(
                      (option) =>
                        Array.isArray(value) && value.includes(option.value)
                    )
                    .map((option) => (
                      <span
                        key={option.value}
                        className="text-foreground focus:ring-ring inline-flex items-center gap-1 rounded-md border py-0.5 pl-2 pr-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                      >
                        <span>{option.label}</span>
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            handleSelect(option.value);
                          }}
                          className="text-muted-foreground/60 hover:bg-accent hover:text-muted-foreground flex items-center rounded-sm px-px"
                        >
                          <Cross2Icon />
                        </span>
                      </span>
                    ))
                ) : (
                  options.find((opt) => opt.value === value)?.label
                )
              ) : (
                <span className="text-muted-foreground mr-auto">
                  {placeholder}
                </span>
              )}
            </div>
            <div className="text-muted-foreground/60 hover:text-foreground flex items-center self-stretch pl-1 [&>div]:flex [&>div]:items-center [&>div]:self-stretch">
              {value && value.length > 0 ? (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    handleClear();
                  }}
                >
                  <Cross2Icon className="size-4" />
                </div>
              ) : (
                <div>
                  <CaretSortIcon className="size-4" />
                </div>
              )}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command className="max-h-[300px]">
            <CommandInput
              value={searchTerm}
              onValueChange={(e) => setSearchTerm(e)}
              ref={ref}
              placeholder={inputPlaceholder ?? 'Search...'}
              className="h-9"
            />
            {searchTerm && (
              <div
                className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                onClick={() => setSearchTerm('')}
              >
                <Cross2Icon className="size-4" />
              </div>
            )}
            <ScrollArea>
              <CommandList>
                <CommandEmpty>
                  {emptyPlaceholder ?? 'No results found.'}
                </CommandEmpty>
                {options.map((option) => {
                  const isSelected =
                    Array.isArray(value) && value.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      // value={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      {multiple && (
                        <div
                          className={cn(
                            'border-primary mr-2 flex size-4 items-center justify-center rounded-sm border transition-colors',
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible'
                          )}
                        >
                          <CheckIcon />
                        </div>
                      )}
                      <span>{option.label}</span>
                      {!multiple && option.value === value && (
                        <CheckIcon
                          className={cn(
                            'ml-auto',
                            option.value === value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      )}
                    </CommandItem>
                  );
                })}
              </CommandList>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

SelectBox.displayName = 'SelectBox';

export default SelectBox;
