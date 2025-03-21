import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import styled from "styled-components";
import { cn } from "../lib/utils";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const StyledSelectTrigger = styled(SelectPrimitive.Trigger)`
  display: flex;
  height: 2.5rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.375rem;
  border: 1px solid var(--input-border);
  background-color: var(--background);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  outline: none;
  &:focus {
    ring: 2px solid var(--ring);
    ring-offset: 2px;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  & > span {
    line-clamp: 1;
  }
`;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <StyledSelectTrigger ref={ref} className={cn(className)} {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </StyledSelectTrigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const StyledSelectScrollButton = styled(SelectPrimitive.ScrollUpButton)`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
`;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <StyledSelectScrollButton ref={ref} className={cn(className)} {...props}>
    <ChevronUp className="h-4 w-4" />
  </StyledSelectScrollButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <StyledSelectScrollButton ref={ref} className={cn(className)} {...props}>
    <ChevronDown className="h-4 w-4" />
  </StyledSelectScrollButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const StyledSelectContent = styled(SelectPrimitive.Content)`
  position: relative;
  z-index: 50;
  max-height: 24rem;
  min-width: 8rem;
  overflow: hidden;
  border-radius: 0.375rem;
  border: 1px solid var(--popover-border);
  background-color: var(--popover-background);
  color: var(--popover-foreground);
  box-shadow: var(--shadow-md);
  &[data-state="open"] {
    animation: fadeIn 0.2s, zoomIn 0.2s;
  }
  &[data-state="closed"] {
    animation: fadeOut 0.2s, zoomOut 0.2s;
  }
  &[data-side="bottom"] {
    transform: translateY(0.25rem);
  }
  &[data-side="left"] {
    transform: translateX(-0.25rem);
  }
  &[data-side="right"] {
    transform: translateX(0.25rem);
  }
  &[data-side="top"] {
    transform: translateY(-0.25rem);
  }
`;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <StyledSelectContent
      ref={ref}
      className={cn(className)}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn("p-1", {
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]":
            position === "popper",
        })}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </StyledSelectContent>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const StyledSelectLabel = styled(SelectPrimitive.Label)`
  padding: 0.375rem 0.5rem;
  padding-left: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
`;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <StyledSelectLabel ref={ref} className={cn(className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const StyledSelectItem = styled(SelectPrimitive.Item)`
  position: relative;
  display: flex;
  width: 100%;
  cursor: default;
  select-none;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0.375rem 0.5rem;
  padding-left: 2rem;
  font-size: 0.875rem;
  outline: none;
  &:focus {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }
  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <StyledSelectItem ref={ref} className={cn(className)} {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </StyledSelectItem>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const StyledSelectSeparator = styled(SelectPrimitive.Separator)`
  margin: 0.25rem 0;
  height: 1px;
  background-color: var(--muted);
`;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <StyledSelectSeparator ref={ref} className={cn(className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
