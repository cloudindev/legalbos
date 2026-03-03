const { Client } = require('pg');

async function test(url) {
    const client = new Client({ connectionString: url, connectionTimeoutMillis: 5000 });
    try {
        await client.connect();
        console.log(`✅ Success: ${url.replace(/:Rc71JfUHGsVByEkS@/, ':***@')}`);
        await client.end();
    } catch (err) {
        console.error(`❌ Failed: ${url.replace(/:Rc71JfUHGsVByEkS@/, ':***@')} -> ${err.message}`);
    }
}

async function main() {
    const urls = [
        // Direct IPv4 attempt
        "postgresql://postgres:Rc71JfUHGsVByEkS@db.zdrqvialrcsiofaauuis.supabase.co:5432/postgres",
        // Supavisor Session mode
        "postgresql://postgres.zdrqvialrcsiofaauuis:Rc71JfUHGsVByEkS@aws-0-eu-central-1.pooler.supabase.com:5432/postgres",
        // Supavisor Session mode just user
        "postgresql://postgres:Rc71JfUHGsVByEkS@aws-0-eu-central-1.pooler.supabase.com:5432/postgres",
        // Supavisor Transaction mode
        "postgresql://postgres.zdrqvialrcsiofaauuis:Rc71JfUHGsVByEkS@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
    ];
    for (const url of urls) {
        await test(url);
    }
}
main();
