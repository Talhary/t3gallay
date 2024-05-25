"use server";

import { db } from "~/server/db";

export const GetImagesFromUserId = async (userId: string) => {
  if (!userId) throw new Error("Unauthorized");
  return await db.query.dialogs.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
  });
};
