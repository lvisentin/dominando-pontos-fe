'use client';

import { ChangeEvent, useState } from 'react';

export interface ToggleProps {
  value: any;
  disabled?: boolean;
  className?: string;
  id?: string;
  label?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Toggle(props: ToggleProps) {
  const [toggle, setToggle] = useState(props.value ? props.value : false);

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setToggle(e.target.checked);
    props.onChange(e);
  };

  return (
    <div
      className={`w-9 h-5 flex items-center rounded-full p-[2px] transition-all bg ${
        toggle ? 'bg-[#1C8A43]' : 'bg-[#E0E1E7]'
      } ${props.className}`}
    >
      <div className="flex items-center justify-between cursor-pointer">
        <input
          type="checkbox"
          className={`toggle bg-white border-none h-4 w-4 rounded-full shadow-md duration-200 ease-in-out ${
            toggle ? 'transform translate-x-4' : ''
          }`}
          onChange={handleToggle}
          checked={toggle}
          value={toggle}
          disabled={props.disabled}
          id={props.id}
        />

        {props.label && (
          <span className="label-text z-10 ml-6">{props.label}</span>
        )}
      </div>
    </div>
  );
}

export default Toggle;
