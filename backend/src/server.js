import express from "express";
import { ENV } from "./config/env.js";
import {db} from "./config/db.js"
import { favoritesTable, usersTable } from "./db/schema.js";
import { and, eq } from "drizzle-orm";
import job from "./config/cron.js";



const app=express();
const PORT = ENV.PORT || 6000

if(ENV.NODE_ENV === "production") job.start();

// Clerk webhook - must be before express.json() middleware
app.post("/api/webhooks/clerk", express.raw({type: "application/json"}), async (req, res) => {
    try {
        const payload = JSON.parse(req.body.toString());
        const eventType = payload.type;

        if (eventType === "user.created") {
            const { id, email_addresses } = payload.data;
            const email = email_addresses[0]?.email_address;

            if (id && email) {
                await db.insert(usersTable).values({
                    clerkId: id,
                    email: email,
                });
                console.log(`User created in database: ${email}`);
            }
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        res.status(500).json({ error: "Webhook processing failed" });
    }
});

app.use(express.json())

app.get("/api",(req,res)=>{
    res.status(200).json({success:true});
})

app.get("/api/favorites/:userId", async(req,res)=>{
    try {
        const {userId} = req.params;

        const userFavorites = await db
        .select()
        .from(favoritesTable)
        .where(eq(favoritesTable.userId,userId))

        res.status(200).json(userFavorites);
    } catch (error) {
        console.log(`Error fetching the favorites : ${error}`);
        res.status(500).json({error:"something went wrong"})
    }
})

app.post("/api/favorites",async(req,res)=>{
    try {
        const { userId,recipeId,title,image,cookTime,servings} =req.body;

        if(!userId || !recipeId || !title){
            return res.status(400).json({error: "missing required fileds"})
        }
 
        const newFavorites = await db.insert(favoritesTable).values({
            userId,
            recipeId,
            title,
            image,
            cookTime,
            servings
        })
        .returning();

        res.status(201).json(newFavorites[0])

    } catch (error) {
        console.log(`Error is : ${error}`);
        res.status(500).json({error:"something went wrong"})
        
    }
})

app.delete("/api/favorites/:userId/:recipeId", async(req,res)=>{
    try {
        const {userId,recipeId} = req.params  

        await db.delete(favoritesTable).where(
            and(eq(favoritesTable.userId,userId),eq(favoritesTable.recipeId,parseInt(recipeId)))
        );

        res.status(200).json({message:"Favorite removed sucessfully"})
        
    } catch (error) {
        console.log("error removing favorites",error);
        res.status(500).json({error:"Something went wrong"})
        
    }
})


app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`);
    
})