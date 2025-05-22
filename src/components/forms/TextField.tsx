type TextFieldProps = {
  label?: string;
  placeholder?: string;
  value: string;
  autoFocus?: boolean;
  onChange: (val: string) => void;
  onKeyDown: () => void;
};

const TextField = ({
  label,
  value,
  placeholder,
  onChange,
  onKeyDown,
  ...rest
}: TextFieldProps) => {
  // const handleKeyDown = (e: KeyboardEventHandler<HTMLInputElement>) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("do validate");
      onKeyDown();
    }
  };

  return (
    <div className="py-2 px-6 pb-4 flex flex-col">
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
        className="shadow-[2px_2px_0px_rgba(0,0,0,1)] border-2 border-black w-full rounded-sm py-2 px-4 focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-hidden bg-white"
        {...rest}
      />
    </div>
  );
};

export default TextField;
