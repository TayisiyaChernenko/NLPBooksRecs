import json
from postgres import Postgres
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database connection parameters
DB_NAME = os.getenv('DB_NAME', 'nlpbooks')
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', '')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '5432')

def create_database():
    # Connect to PostgreSQL server
    db = Postgres(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
    
    # Create database if it doesn't exist
    result = db.one("SELECT 1 FROM pg_database WHERE datname = %s", (DB_NAME,))
    if not result:
        db.run("CREATE DATABASE %s", (DB_NAME,))

def create_table():
    # Connect to the database
    db = Postgres(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
    
    # Create table
    db.run('''
        CREATE TABLE IF NOT EXISTS books (
            title TEXT PRIMARY KEY,
            avg_rating REAL,
            positive_words TEXT,
            negative_words TEXT
        );
    ''')

def import_json_data():
    # Connect to the database
    db = Postgres(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
    
    # Read and parse JSON file
    with open('Preprocessing/log_odds_results.json', 'r') as f:
        data = json.load(f)
    
    #Prepare the data for the database
    for book in data:
        title = book["title"]
        avg_rating = book["average_rating"]

        # Extract just the words from each word list
        positive_words = ', '.join([w["word"] for w in book["top_positive_words"]])
        negative_words = ', '.join([w["word"] for w in book["top_negative_words"]])
    
        # Insert with upsert
        db.run(
        """
        INSERT INTO books (title, avg_rating, positive_words, negative_words)
        VALUES (%s, %s, %s, %s)
        ON CONFLICT (title) DO UPDATE SET
            avg_rating = EXCLUDED.avg_rating,
            positive_words = EXCLUDED.positive_words,
            negative_words = EXCLUDED.negative_words
        """,
        (title, avg_rating, positive_words, negative_words)
    )

if __name__ == '__main__':
    print("Creating database...")
    create_database()
    
    print("Creating table...")
    create_table()
    
    print("Importing JSON data...")
    import_json_data()
    
    print("Done!") 