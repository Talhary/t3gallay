"use server";

import { db } from "~/server/db";

export const getImage = async (id: string) => {
  try {
    console.log(id);
    const image = await db.query.dialogs.findMany();
    const data = image.filter((el) => el.id === id)?.[0];
    if (!data) return { status: 400, message: "Item not found" };
    return { status: 200, message: data };
  } catch (error: any) {
    if (!error?.message) error.message = "Sometign gone wrong";
    return {
      status: 500,
      message: error?.message as string,
    };
  }
};
