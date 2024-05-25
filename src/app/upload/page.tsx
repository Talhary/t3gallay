"use client";
import { useUser } from "@clerk/nextjs";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { UploadButton } from "~/utils/uploadthing";
import { ThemeChange } from "components/theme";
const options = [
  { value: "red", label: "red" },
  { value: "blue", label: "blue" },
];
type initialStateProps = {
  name: string;
  paragraph: string;
  userId: string;
  color?: string;
  imageId?: string;
  imgUrl?: string;
};

const UploadData = () => {
  const userId = useUser()?.user?.id;

  const initialFormState = {
    name: "",
    paragraph: "",
    color: "",
    userId: userId,
    imageId: "",
    imgUrl: "",
  } as initialStateProps;

  const [formData, setFormData] = useState<initialStateProps>(initialFormState);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
      userId: userId as string,
    };

    if (updatedFormData.userId) setError(""); // Clear error if user is logged in
    setFormData(updatedFormData);
  };
  const handleColorChange = (object: any) => {
    const color = object;

    const updatedFormData = {
      ...formData,
      color: object,
    };

    // Clear error if user is logged in
    setFormData(updatedFormData);
  };
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!formData.name || !formData.paragraph)
      return setError("Please fill the complete form");
    if (!formData.userId) return setError("Please Login to continue");
    setPending(true);
    fetch("/api/v1/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res: { status: string; message: string }) => {
        console.log(res);
        if (res.status == "201") {
          setMsg(res.message);
        } else {
          setError(res.message);
        }
        setFormData(initialFormState);

        setPending(false);
      });
  };

  return (
    <>
     
      <div className="mx-auto flex h-screen w-[300px] items-center">
        <form onSubmit={submit}>
          <div className="card">
            <div className="flex flex-col gap-y-1">
              <label htmlFor="name">Enter The Name</label>
              <div className="rounded-md border p-2">
                <input
                  // disabled={pending}
                  id="name"
                  name="name"
                  className="focus:outline-none"
                  type="text"
                  placeholder="heading"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="paragraph">Enter The Paragraph</label>
              <div className="rounded-md border p-5">
                <textarea
                  // disabled={pending}
                  id="paragraph"
                  name="paragraph"
                  className="focus:outline-none"
                  value={formData.paragraph}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className=" flex-col gap-y-1">
              <label htmlFor="color">Enter The Color</label>
              <Select
                onValueChange={handleColorChange}
                defaultValue={formData.color}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((el, i) => {
                    return (
                      <SelectItem key={i + 1} value={el.value}>
                        {el.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="hidden w-full max-w-sm items-center gap-1.5">
              <label htmlFor="picture">Picture</label>
              <Input
                id="picture"
                type="file"
                onChange={(e: any) => setFile(e?.target?.files?.[0])}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const data = new FormData();
                  if (!file) return;
                  data.set("file", file);
                  fetch("/api/v1/upload-image", {
                    method: "POST",

                    body: data,
                  })
                    .then((res) => res.json())
                    .then((res: any) => {
                      // console.log({ res });
                      if (res.success) {
                        setFormData({
                          ...formData,
                          imageId: res?.id,
                        });
                      }
                    });
                }}
              >
                Upload
              </button>
            </div>
            <div>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res: any) => {
                  // Do something with the response
                  setFormData({ ...formData, imgUrl: res?.[0]?.url });
                  console.log("res: ", res?.[0].url);
                  // setMsg("file uploaded");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  setError("Something gone wrong");
                }}
              />
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="w-full rounded-md bg-black px-2 py-1 text-white dark:bg-white dark:text-black"
              >
                Submit
              </button>
              {pending && <>Please Wait we are working</>}
              {msg && (
                <>
                  <p>{msg}</p>
                  <Button className="w-full" variant={"outline"}>
                    <Link href="/"> Main Page</Link>
                  </Button>
                </>
              )}
              {error}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadData;
