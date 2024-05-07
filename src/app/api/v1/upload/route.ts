import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { dialogs } from "~/server/db/schema";
import { uuid } from "uuidv4";
export const POST = async (req: NextRequest, res: NextResponse) => {
  const { name, color, paragraph, userId } = await req.json();
  // return NextResponse.json({ message: "lol" });
  if (!name || !color || !paragraph || !userId)
    return NextResponse.json({
      status: "404",
      message: "Please fill all properties",
    });
  await db
    .insert(dialogs)
    .values({ id: uuid().toString(), userId, name, color, paragraph });
  return NextResponse.json({
    status: "201",
    message: "Done uploading",
  });
};