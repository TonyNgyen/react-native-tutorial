import { Database } from "./supabase";

export type Event = Database["public"]["Tables"]["events"]["Row"]
export type Attedance = Database["public"]["Tables"]["attendance"]["Row"]