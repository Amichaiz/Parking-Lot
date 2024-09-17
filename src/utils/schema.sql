-- Create vehicles table
CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  plate VARCHAR(255) NOT NULL,
  entered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  leaving_at TIMESTAMP
);

-- Create registered table
CREATE TABLE registered (
  id SERIAL PRIMARY KEY,
  plate VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
