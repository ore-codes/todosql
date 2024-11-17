#!/bin/bash

# Wait until PostgreSQL is ready
wait-for-it postgres:5432 --timeout=60 -- echo "PostgreSQL is up!"

# Database connection details
DB_HOST="postgres"
DB_PORT="5432"
DB_NAME="todosql"
DB_USER="admin"
export PGPASSWORD="admin"

# Path to directory containing SQL files
SQL_DIR="./setup"

# Iterate over each SQL file in the directory
for sql_file in "$SQL_DIR"/*.sql; do
  echo "Running: $sql_file"

  # Run the SQL file using psql
  psql -h "$DB_HOST" -p "$DB_PORT" -d "$DB_NAME" -U "$DB_USER" -f "$sql_file"

  # Check if the command was successful
  if [ $? -eq 0 ]; then
    echo "Successfully ran: $sql_file"
  else
    echo "Error running: $sql_file"
    exit 1 # Exit the script if an error occurs
  fi
done

echo "All SQL files executed successfully."
