from flask import Flask, render_template, request, redirect, url_for, session, jsonify

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this to a secure secret key

# User database (for demonstration purposes)
users_db = {
    'user1': {'password': 'password1', 'id': 1},
    'user2': {'password': 'password2', 'id': 2}
}

# Invitation database (for demonstration purposes)
invitations_db = []

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
            return render_template("dash.html")  # Redirect to a protected route
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

@app.route('/send_invite', methods=['POST'])
def send_invite():
    if 'user_id' in session:
        sender_id = session['user_id']
        receiver_id = request.form['receiver_id']  # Assuming a form with 'receiver_id'
        # Create an invitation and add it to the invitation database
        invitation = {'sender_id': sender_id, 'receiver_id': receiver_id}
        invitations_db.append(invitation)
        return 'Invitation sent successfully.'
    else:
        return 'User not authenticated.'

@app.route('/view_invites')
def view_invites():
    if 'user_id' in session:
        user_id = session['user_id']
        received_invites = [invite for invite in invitations_db if invite['receiver_id'] == user_id]
        return jsonify({'received_invites': received_invites})
    else:
        return 'User not authenticated.'

if __name__ == '__main__':
    app.run(debug=True)
