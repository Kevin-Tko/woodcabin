import { createClient } from '@supabase/supabase-js'

//supabase client setup

const supabaseUrl = 'https://agwkkpvtlsrlgkqgwszv.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnd2trcHZ0bHNybGdrcWd3c3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0OTQ5NTcsImV4cCI6MjA0NTA3MDk1N30.kvI4I9JCbcTXbiarLXIbBqcSeIiQjHeFgucpizqlgU4'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
