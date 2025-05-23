type TextFieldProps = {
  label?: string;
  placeholder?: string;
  value: string;
  autoFocus?: boolean;
  onChange: (val: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const TextField = ({
  label,
  value,
  placeholder,
  onChange,
  onKeyDown,
  ...rest
}: TextFieldProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onKeyDown(e);
    }
  };

  return (
    <div className="mx-8 py-2 w-full flex flex-col">
      {label && (
        <label htmlFor={placeholder} className="text-sm py-1">
          {label}
        </label>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={({ target: { value } }) => onChange(value)}
        className="shadow-[2px_2px_0px_rgba(0,0,0,1)] border-2 border-black w-full rounded-sm py-4 md:py-2 px-4 focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-hidden bg-white"
        {...rest}
      />
    </div>
  );
};

export default TextField;
