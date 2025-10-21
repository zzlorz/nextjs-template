import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://dxzmebuimxtfznmcdwht.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4em1lYnVpbXh0ZnpubWNkd2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3MzMxMTMsImV4cCI6MjAyODMwOTExM30.HrTOiN3nsf6EJBcq8nw5ZpO5H23g5OZ8oSN1f-fPq0Q';
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export default supabase