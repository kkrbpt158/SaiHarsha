from flask import Flask, render_template, request, redirect, url_for
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('product.html')
# @app.route('/create')
# def index():
#     return render_template('product.html')

@app.route ('/submit', methods=['POST'])
def submit():
    # Capture form values and store them in variables
    product_id = request.form['product_id']
    product_name = request.form['product_name']
    product_cost = request.form['product_cost']
    product_rev_date = request.form['product_rev_date']
    product_exp_date = request.form['product_exp_date']
    product_quantity = request.form['product_quantity']

    # You may want to validate the salary and other inputs here

    # Print values to confirm they're captured (for debugging)
    print(f"Product ID: {product_id}, Product Name: {product_name}, Product Cost: {product_cost}, Product Received Date: {product_rev_date}, Product Expiry Date: {product_exp_date}, Product Quantity: {product_quantity}")

    # Insert data into the MySQL database
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            insert_query = '''
            INSERT INTO vsal_product (vsal_prodid, vsal_prodname, vsal_cost, vsal_rev_date, vsal_exp_date, vsal_prodquan) 
            VALUES (%s, %s, %s, %s, %s, %s)
            '''
            data = (product_id, product_name, product_cost, product_rev_date, product_exp_date, product_quantity)
            cursor.execute(insert_query, data)
            connection.commit()
            cursor.close()
        except Error as e:
            print(f"Error: {e}")
        finally:
            connection.close()

    return redirect(url_for('index'))
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='vsal'
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None

if __name__ == '__main__':
    app.run(debug=True)