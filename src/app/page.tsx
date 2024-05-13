// import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ThemeChange } from "components/theme";
import { db } from "~/server/db";

// const colors = ["red", "blue", "yellow", "pink"].map((el) => `bg-${el}-500`);
export const dynamic = "force-dynamic";
export default async function HomePage() {
  const user = auth();
  const dialogs = await (
    await db.query.dialogs.findMany()
  ).filter((el) => {
    return el.userId === user.userId;
  });
  if (!user?.userId) {
    return <>Please Login</>;
  }
  return (
    <>
      <div className="">
        <ThemeChange />
      </div>

      <div className=" mx-auto mt-3 flex w-[97%] flex-row flex-wrap items-start justify-center gap-2 max-sm:w-full ">
        {dialogs.map((el, i) => {
          return (
            <div
              key={i + 1}
              className="max-min-sm:max-w-full  w-[200px] rounded-lg  bg-white px-6 py-8 opacity-90 shadow-md ring-1 ring-slate-900/5 transition-all hover:scale-[1.02] hover:opacity-100 hover:shadow-xl dark:bg-slate-800"
            >
              <div>
                {/* <div className=" bg-red-500 hidden bg-blue-500 bg-yellow-500 bg-pink-500"></div> */}
                <span
                  className={`inline-flex items-center justify-center rounded-md p-2 shadow-lg bg-${el.color}-500`}
                >
                  {el.imageUrl ? (
                    <></>
                  ) : (
                    <svg
                      className="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    ></svg>
                  )}
                </span>
              </div>
              <h3 className="mt-5 text-base font-medium  tracking-tight text-slate-900 dark:text-white">
                {el.name}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {el.paragraph}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
