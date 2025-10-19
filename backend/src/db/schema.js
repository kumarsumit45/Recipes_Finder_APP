import {pgTable,serial,text,timestamp,integer} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: serial("id").primaryKey(),
    clerkId: text("clerk_id").notNull().unique(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const favoritesTable = pgTable("favorites",{
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    recipeId: text("receipe_id").notNull(),
    title: text("title").notNull(),
    image: text("image"),
    cookTime: text("cook_time"),
    servings: text("servings"),
    createdAt: timestamp("created_at").defaultNow(),
})