import { createClient } from '@supabase/supabase-js'
const supabaseURL='https://puowsixhokfululaismt.supabase.co'
const supabaseAPIKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1b3dzaXhob2tmdWx1bGFpc210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyMjk3OTMsImV4cCI6MTk5NjgwNTc5M30.fJoF-uyCJa18s0FKuw0h7-5kCgHUdJW0PAO1fG9e2aM'
export const supabase = createClient(supabaseURL, supabaseAPIKey)

