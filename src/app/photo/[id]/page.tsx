"use client";

import { useEffect, useState, useTransition } from "react";
import { getImage } from "./_components/image";
import { Error } from "./_components/error";
import { ThemeChange } from "components/theme";

const PhotoPage = ({ params }: { params: { id: string } }) => {
  const [pending, startTransition] = useTransition();
  const [data, setData] = useState<any>();
  const [err, setError] = useState("");
  const [start, setStart] = useState(true);
  useEffect(() => {
    startTransition(() => {
      setStart(false);
      getImage(params.id).then((res) => {
        console.log(res);
        if (res.status !== 200) {
          setStart(true);
          return setError((res?.message as string) || "Something gone wrong");
        }
        setData(res.message as object);
      });
    });
  }, []);
  if (start) {
    return (
      <>
        {!err && <>Please wait</>}
        <div className="flex h-screen items-center">
          {err && <Error msg={err} />}
        </div>
      </>
    );
  }
  if (!data?.name) {
    return <> Please wait</>;
  }
  return (
    <>
      <div>
        <ThemeChange />
      </div>
      <div className=" mx-auto w-[40%]">
        <div className="mx-auto flex   flex-col items-start justify-center bg-gray-500 p-4">
          {data?.imgUrl && <img src={data.imgUrl} />}
          <h2 className="text-xl">{data.name}</h2>
          <p>{data.paragraph}</p>
        </div>
        <div>{err && <Error msg={err} />}</div>
      </div>
    </>
  );
};
export default PhotoPage;
