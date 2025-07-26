import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://aqawtgjdmeksvpvegpks.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxYXd0Z2pkbWVrc3ZwdmVncGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MTA2ODksImV4cCI6MjA2ODA4NjY4OX0.d5lgmsa4Lp7DyxQ4Oo8DzMrhIaRwFlU8D22kz8MpDpY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
