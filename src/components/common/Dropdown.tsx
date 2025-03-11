import {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useState,
} from "react";

import ArrowIcon from "@/assets/icons/arrow_drop_down.svg?react";
import useOutsideClick from "@/hooks/common/useOutsideClick";

interface DropdownProps<T> {
  defaultValue?: T;
  options: DropdownOption<T>[];
  onChange?: (value: T) => void;
  placeholder?: string;
}

export default function Dropdown<T>({
  defaultValue,
  options,
  onChange,
  placeholder,
}: DropdownProps<T>) {
  const [opened, setOpened] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(
    defaultValue !== undefined
      ? options.findIndex((option) => option.value === defaultValue)
      : -1
  );

  const open = useCallback(() => setOpened(true), []);
  const close = useCallback(() => setOpened(false), []);

  const handleChange = useCallback(
    (index: number) => {
      setSelected(index);
      onChange?.(options[index].value);
      close();
    },
    [close, onChange, options]
  );

  return (
    <DropdownContext.Provider
      value={{ opened, selected, open, close, options, onChange: handleChange }}
    >
      <div className="relative inline-block text-left">
        <DropdownButton placeholder={placeholder} />
        <DropdownMenu />
      </div>
    </DropdownContext.Provider>
  );
}

type DropdownOption<T> = {
  label: ReactNode;
  value: T;
};

interface DropdownContextType<T = unknown> {
  opened: boolean;
  selected: number;
  open: () => void;
  close: () => void;
  options: DropdownOption<T>[];
  onChange: (index: number) => void;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

function DropdownButton({ placeholder = "select" }: { placeholder?: string }) {
  const { open, options, selected } = useContext(DropdownContext)!;

  return (
    <button
      type="button"
      onClick={open}
      className="relative text-left border border-gray300 rounded-10 min-w-197 p-14 pr-36"
    >
      {selected >= 0 ? options[selected].label : placeholder ?? ""}
      <span className="absolute transform -translate-y-1/2 right-12 top-1/2">
        <ArrowIcon />
      </span>
    </button>
  );
}

function DropdownMenu() {
  const { opened, close, options, onChange } = useContext(DropdownContext)!;

  const containerRef = useOutsideClick(close);

  return opened ? (
    <div
      ref={containerRef as RefObject<HTMLDivElement>}
      className="absolute left-0 z-10 flex flex-col bg-white border border-r border-gray300 rounded-10 min-w-197"
    >
      {options.map((option, index) => (
        <DropdownMenuItem
          key={`${option.value}`}
          label={option.label}
          onSelect={() => onChange(index)}
        />
      ))}
    </div>
  ) : null;
}

function DropdownMenuItem({
  label,
  onSelect,
}: {
  label: ReactNode;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="text-left border-gray300 p-14 border-b-1 last:border-b-0"
    >
      {label}
    </button>
  );
}
