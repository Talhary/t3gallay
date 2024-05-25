import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import { GetImagesFromUserId } from "~/actions/all-images";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
// const colors = ["red", "blue", "yellow", "pink"].map((el) => `bg-${el}-500`);
export const dynamic = "force-dynamic";
export default async function HomePage() {
  const user = auth();

  if (!user?.userId) {
    return (
      <div className="flex h-[80vh] w-screen flex-col items-center justify-center gap-y-3">
        <span className="text-xl">Please Login/signUp to Continue</span>
        <div className="w-[100%] rounded-md bg-gray-500 p-2 text-center text-2xl">
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    );
  }
  const dialogs = await GetImagesFromUserId(user?.userId);

  return (
    <>
      {!dialogs?.[0] && (
        <div className="flex h-[80vh] w-screen flex-col items-center justify-center gap-y-3">
          <span className="text-xl">Please Upload content to see Here</span>
          <div className="w-[100%] rounded-md bg-gray-500 p-2 text-center text-2xl">
            <Link href="/upload">Upload</Link>
          </div>
        </div>
      )}
      <div className="z-10 mx-auto mt-3 flex w-[97%] flex-row flex-wrap items-start  justify-start gap-x-2 gap-y-1 max-md:justify-center max-md:space-y-4 max-sm:w-full ">
        {dialogs.map((el, i) => {
          return (
            <Link href={"/photo/" + el.id}>
              <div
                id={el.id}
                key={i + 1}
                className="max-min-sm:max-w-full  w-[200px] rounded-lg bg-white px-6 py-8 opacity-90 shadow-md ring-1 ring-slate-900/5 transition-all hover:scale-[1.02] hover:opacity-100 hover:shadow-xl dark:bg-slate-800"
              >
                <div>
                  {/* <div className="bg-red-500 hidden bg-blue-500 bg-yellow-500 bg-pink-500"></div> */}
                  <span
                    className={`inline-flex items-center justify-center rounded-md p-2 shadow-lg bg-${el.color}-500`}
                  >
                    {el.imgUrl ? (
                      <>
                        <Image
                          alt={el.name}
                          src={el.imgUrl}
                          height={400}
                          width={200}
                          className="object-fill"
                        />
                      </>
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
                <h3 className="mt-5 text-base font-medium tracking-tight text-slate-900 dark:text-white">
                  {el.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {el.paragraph}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
