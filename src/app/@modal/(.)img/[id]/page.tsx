"use client";

import { useEffect, useState, useTransition } from "react";
import { getImage } from "./_components/get-image";
import { Error } from "./_components/error";
import { Modal } from "./modal";
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
      <Modal>
        <div className=" mx-auto w-[80%]">
          <div className="mx-auto flex   flex-col items-start justify-center ">
            {data?.imgUrl && (
              <img className="h-[100%] w-[100%] " src={data.imgUrl} />
            )}
          </div>
          <div>{err && <Error msg={err} />}</div>
        </div>
      </Modal>
    </>
  );
};
export default PhotoPage;
