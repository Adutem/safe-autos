import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import styled from "styled-components";
import { cn } from "../lib/utils";

const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  height: 1rem;
  width: 1rem;
  border-radius: 0.125rem;
  border: 1px solid var(--primary);
  ring-offset: var(--background);
  &:focus-visible {
    outline: none;
    ring: 2px solid var(--ring);
    ring-offset: 2px;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &[data-state="checked"] {
    background-color: var(--primary);
    color: var(--primary-foreground);
  }
`;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <StyledCheckbox ref={ref} className={cn(className)} {...props}>
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </StyledCheckbox>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
