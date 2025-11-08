import {
  createContext,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type PropsWithChildren,
  type CSSProperties,
} from 'react';

type CollapsibleContextValue = {
  isOpen: boolean;
  toggle: () => void;
};

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

const useCollapsible = () => {
  const ctx = useContext(CollapsibleContext);
  if (!ctx) {
    throw new Error('Collapsible components must be used within <Collapsible>');
  }
  return ctx;
};

type CollapsibleProps = PropsWithChildren<{ defaultOpen?: boolean }>;

const Collapsible = ({ children, defaultOpen = true }: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <CollapsibleContext.Provider value={{ isOpen, toggle: () => setIsOpen((prev) => !prev) }}>
      {children}
    </CollapsibleContext.Provider>
  );
};

type CollapsibleTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

const CollapsibleTrigger = ({ className, children, ...props }: CollapsibleTriggerProps) => {
  const { toggle, isOpen } = useCollapsible();
  return (
    <button
      type="button"
      data-state={isOpen ? 'open' : 'closed'}
      onClick={toggle}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

type CollapsibleContentProps = HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
};

const CollapsibleContent = ({ className, children, ...props }: CollapsibleContentProps) => {
  const { isOpen } = useCollapsible();
  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateRows: isOpen ? '1fr' : '0fr',
    transition: 'grid-template-rows 300ms ease',
    overflow: 'hidden',
  };

  return (
    <div style={gridStyle} data-state={isOpen ? 'open' : 'closed'} {...props}>
      <div className={className}>{children}</div>
    </div>
  );
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
