import sql from './db';

// Database interface (snake_case)
export interface NameDB {
  id: number;
  first_name: string;
  last_name: string;
  created_at: string;
}

// API interface (camelCase)
export interface Name {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
}

// Transform database result to API format
function transformDBToAPI(dbName: NameDB): Name {
  return {
    id: dbName.id,
    firstName: dbName.first_name,
    lastName: dbName.last_name,
    createdAt: dbName.created_at
  };
}

// Names table operations
export async function addName(firstName: string, lastName: string): Promise<Name> {
  const result = await sql`
    INSERT INTO names (first_name, last_name)
    VALUES (${firstName}, ${lastName})
    RETURNING *
  `;
  return transformDBToAPI(result.rows[0] as NameDB);
}

export async function getAllNames(): Promise<Name[]> {
  const result = await sql`
    SELECT * FROM names
    ORDER BY created_at DESC
  `;
  return result.rows.map((row) => transformDBToAPI(row as NameDB)) as Name[];
} 