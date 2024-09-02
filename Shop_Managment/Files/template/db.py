import mysql.connector
from mysql.connector import (errorcode)

# Function to create a database and a table
def create_database_and_table():
    try:
        # Establish connection to MySQL server
        conn = mysql.connector.connect(
            host="localhost",  # Your MySQL host
            user="root",  # Your MySQL username
            password=""  # Your MySQL password
        )

        cursor = conn.cursor()

        # Create database
        cursor.execute("CREATE DATABASE IF NOT EXISTS vsal")
        print("Database 'vsal' created successfully or already exists.")

        # Select the database
        cursor.execute("USE vsal")

        # Create table
        create_table_query = """
        CREATE TABLE IF NOT EXISTS vsal_product (
            id INT AUTO_INCREMENT PRIMARY KEY,
            vsal_prodid VARCHAR(255) NOT NULL,
            vsal_prodname VARCHAR(255) NOT NULL,
            vsal_cost INT,
            vsal_rev_date DATE,
            vsal_exp_date DATE,
            vsal_prodquan INT
        )
        """
        cursor.execute(create_table_query)
        print("Table 'vsal_product' created successfully or already exists.")

    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    finally:
        # Close the cursor and connection
        cursor.close()
        conn.close()


# Call the function
create_database_and_table()
