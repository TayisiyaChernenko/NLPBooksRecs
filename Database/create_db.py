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

def create_table_books():
    # Connect to the database
    db = Postgres(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
    
    # Create table
    db.run('''
        CREATE TABLE IF NOT EXISTS books (
            title TEXT PRIMARY KEY,
            avg_rating REAL,
            positive_words TEXT,
            positive_weights TEXT,
            negative_words TEXT,
            negative_weights TEXT
        );
    ''')

def create_table_summaries():
    db = Postgres(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
    db.run('''
        CREATE TABLE IF NOT EXISTS summaries (
            title TEXT PRIMARY KEY,
            summary TEXT
        );
    ''')

def import_json_data_books():
    # Connect to the database
    db = Postgres(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
    
    # Read and parse JSON file
    with open('./Preprocessing/log_odds_results.json', 'r') as f:
        data = json.load(f)
    
    #Prepare the data for the database
    for book in data:
        title = book["title"]
        avg_rating = book["average_rating"]

        # Extract just the words from each word list
        positive_words = ', '.join([w["word"] for w in book["top_positive_words"]])
        positive_weights = ', '.join([str(v["log_odds"]) for v in book["top_positive_words"]])
        negative_words = ', '.join([w["word"] for w in book["top_negative_words"]])
        negative_weights = ', '.join([str(v["log_odds"]) for v in book["top_negative_words"]])
        
        # Insert book information into the database
        db.run(
        """
        INSERT INTO books (title, avg_rating, positive_words,positive_weights, negative_words, negative_weights)
        VALUES (%s, %s, %s, %s, %s, %s )
        ON CONFLICT (title) DO UPDATE SET
            avg_rating = EXCLUDED.avg_rating,
            positive_words = EXCLUDED.positive_words,
            positive_weights = EXCLUDED.positive_weights,
            negative_words = EXCLUDED.negative_words,
            negative_weights = EXCLUDED.negative_weights
        """,
        (title, avg_rating, positive_words, positive_weights, negative_words, negative_weights)
    )

def import_json_data_summaries():
    # Connect to the database
    db = Postgres(f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
    
    # Read and parse JSON file
    with open('./Preprocessing/top10_book_summaries.json', 'r') as f:
        sum= json.load(f) 
    
    #Prepare the data for the database
    for s in sum:
        book_id = s["book_id"]
        title = s["title"]
        summary = s["review_summary"]
        
        # Insert book summaries into the database
        db.run(
            """
            INSERT INTO summaries (title, summary)
            VALUES (%s, %s)
            ON CONFLICT (title) DO UPDATE SET
                summary = EXCLUDED.summary
            """,    
            (title, summary)
        )

if __name__ == '__main__':
    print("Creating database...")
    create_database()
    
    print("Creating table for books...")
    create_table_books()
    
    print("Importing JSON data for books...")
    import_json_data_books()
    
    print("Creating table for summaries...")
    create_table_summaries()
    
    print("Importing JSON data for summaries...")
    import_json_data_summaries()
    
    print("Done!") 