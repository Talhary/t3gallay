// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `t3gallay_${name}`);

export const dialogs = createTable(
  "dialog",
  {
    id: varchar("id", { length: 40 }).primaryKey(),
    imageUrl: varchar("imageUrl", { length: 1024 }),
    name: varchar("name", { length: 256 }).notNull(),
    paragraph: varchar("paragraph", { length: 2024 }).notNull(),
    color: varchar("color", { length: 50 }).notNull(),
    userId: varchar("userId", { length: 50 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
