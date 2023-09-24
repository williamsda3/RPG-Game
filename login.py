from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a secure secret key

# ... other parts of your Flask application ...

# User database (for demonstration purposes)
users_db = {
    'user1': {'password': 'password1', 'id': 1},
    'user2': {'password': 'password2', 'id': 2}
}

def authenticate_user(username, password):
    # Check if the username exists in the database
    if username in users_db:
        user = users_db[username]
        # Check if the provided password matches the stored password
        if user['password'] == password:
            return user['id']  # Return the user ID as a form of user identification

    return None  # Return None if authentication fails


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Check if the provided credentials are valid (e.g., against a database)
        # Set the user's ID in the session upon successful login
        user_id = authenticate_user(request.form['username'], request.form['password'])
        if user_id:
            session['user_id'] = user_id
            return redirect(url_for('dashboard'))  # Redirect to a protected route
        else:
            return 'Invalid credentials. Please try again.'

    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    # Check if the user is authenticated (i.e., user ID is in the session)
    if 'user_id' in session:
        # Load the dashboard for the authenticated user
        return 'Welcome to the dashboard, user {}'.format(session['user_id'])
    else:
        return redirect(url_for('login'))  # Redirect to login if not authenticated

# ... other routes and application logic ...

if __name__ == '__main__':
    app.run(debug=True)
