import { neon } from '@neondatabase/serverless';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const sql = neon(process.env.DATABASE_URL);

  const { name, price } = JSON.parse(event.body);

  await sql`INSERT INTO products (name, price) VALUES (${name}, ${price})`;

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
}
