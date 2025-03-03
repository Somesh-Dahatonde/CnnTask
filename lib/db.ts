import { createConnection, type Connection } from "mysql2/promise"

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
  },
}

// Get a database connection
export async function getDbConnection(): Promise<Connection> {
  try {
    return await createConnection(dbConfig)
  } catch (error) {
    console.error("Error connecting to database:", error)
    throw new Error("Failed to connect to database")
  }
}

// Initialize database schema
export async function initializeDatabase() {
  let connection: Connection | null = null

  try {
    connection = await getDbConnection()

    // Create leads table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mobile VARCHAR(15) NOT NULL,
        location VARCHAR(255) NOT NULL,
        photo TEXT,
        aadhar_number VARCHAR(12),
        aadhar_verified BOOLEAN DEFAULT FALSE,
        aadhar_verification_id VARCHAR(255),
        payment_status ENUM('PENDING', 'PAID', 'FAILED') DEFAULT 'PENDING',
        registration_complete BOOLEAN DEFAULT FALSE,
        invoice_url TEXT,
        registration_form_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Create payments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lead_id INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        transaction_id VARCHAR(255) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        status ENUM('PENDING', 'SUCCESS', 'FAILED') DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (lead_id) REFERENCES leads(id)
      )
    `)

    console.log("Database schema initialized successfully")
  } catch (error) {
    console.error("Error initializing database schema:", error)
    throw error
  } finally {
    if (connection) await connection.end()
  }
}

