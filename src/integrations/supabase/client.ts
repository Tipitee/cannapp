
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zyzlnjponxntbbkthdaw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5emxuanBvbnhudGJia3RoZGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2OTc5NjksImV4cCI6MjA1OTI3Mzk2OX0.2XsVioK5AwwQeB2qqh_-aUhxsmntzln7RX3FUuYfwj0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
