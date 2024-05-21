"use client";
export const Error = ({ msg }: { msg: string }) => {
  return (
    <div className=":bg- mx-3 w-[80%] rounded-md bg-black p-2 font-semibold text-destructive shadow-md dark:bg-white  ">
      <h2>{msg}</h2>
    </div>
  );
};
