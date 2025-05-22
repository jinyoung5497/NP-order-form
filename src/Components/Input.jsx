import React from "react";

export default function Input({ id, ...rest }) {
  return (
    <input
      id={id}
      {...rest}
      className="border-[1px] border-slate-500 rounded-md w-full h-10 focus:border-black focus:border-2 outline-none p-2 text-sm mb-4"
    />
  );
}
