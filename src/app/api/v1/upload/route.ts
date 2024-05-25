import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { dialogs } from "~/server/db/schema";
import { uuid } from "uuidv4";
type initialStateProps = {
  name: string;
  paragraph: string;
  userId: string;
  color?: string;
  imageId?: string;
  imgUrl?: string;
};
export const POST = async (req: NextRequest, res: NextResponse) => {
  const { name, color, paragraph, userId, imgUrl } =
    (await req.json()) as initialStateProps;
  console.log(imgUrl);  
  // return NextResponse.json({ message: "lol" });
  if (!name || !paragraph || !userId)
    return NextResponse.json({
      status: "404",
      message: "Please fill all properties",
    });
  await db.insert(dialogs).values({
    id: uuid().toString(),
    userId,
    name,
    color,
    paragraph,
    imgUrl,
  });
  return NextResponse.json({
    status: "201",
    message: "Done uploading",
  });
};
