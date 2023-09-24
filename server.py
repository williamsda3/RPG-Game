from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


# Initializing flask app and configuring database
app = Flask(__name__)
CORS(app)  # Allow all origins
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///player_stats.db'
db = SQLAlchemy(app)

# Creating a table for Player and Invite
class PlayerStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    in_lobby = db.Column(db.Boolean, default=False)  # New field to indicate if a player is in the lobby
    hp = db.Column(db.Integer)
    atk = db.Column(db.Integer)
    lobby_code = db.Column(db.Integer)
    in_lobby = db.Column(db.Boolean, default=False)
    invitations_sent = db.relationship('Invitation', backref='sender', lazy=True, foreign_keys='Invitation.sender_id')
    invitations_received = db.relationship('Invitation', backref='receiver', lazy=True, foreign_keys='Invitation.receiver_id')
    
    def as_dict(self):
        return {
            'id': self.id,
            'hp': self.hp,
            'atk': self.atk,
            'lobby_code': self.lobby_code,
            'in_lobby': self.in_lobby
        }
        
class Invitation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('player_stats.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('player_stats.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')  # 'pending', 'accepted', 'rejected'

    def as_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'status': self.status
        }


# Initialize the database
with app.app_context():
    db.create_all()

# Routes for Player info


@app.route('/players', methods=['GET'])
def get_players():
    players = PlayerStats.query.all()
    return jsonify([player.as_dict() for player in players])

# Get details about a specific player by its unique ID
@app.route('/players/<int:player_id>', methods=['GET'])
def get_player(player_id):
    player = PlayerStats.query.get_or_404(player_id)
    return jsonify(player.as_dict())

# Allow the addition of new grocery players to the inventory with information such as name, price, and hp

@app.route('/players', methods=['POST'])
def create_player():
    # Assuming you have a way to generate a unique ID (replace this with your logic)
   
    
    last_player = PlayerStats.query.order_by(PlayerStats.id.desc()).first()
    if last_player:
        new_player_id = last_player.id + 1
    else:
        new_player_id = 1

    
   

    # Create the new player
    player = PlayerStats(id=new_player_id, hp=10, atk=1, in_lobby=False)

    db.session.add(player)
    db.session.commit()

    return jsonify({'message': 'player created successfully', "id": new_player_id}), 201



# Created a function to reduce the players hp as is gets moved to the users Cart
@app.route('/players/<int:player_id>/reduce/<int:dmg>', methods=['POST'])
def reduce_player(player_id, dmg):
    player = PlayerStats.query.get_or_404(player_id)
    if player:
        if dmg <= player.hp:
            player.hp -= dmg
            db.session.commit()
            return jsonify(player.as_dict()), 200
        elif dmg >= player.hp:
            player.hp = 0
            return jsonify({'message': f'Player{player_id} defeated!'}), 301
            
    else:
        return jsonify({'error': 'Could not reduce player hp'}), 400
    
    
@app.route('/players/<int:player_id>/charge', methods=['POST'])
def charge_player(player_id):
    player = PlayerStats.query.get_or_404(player_id)
    if player:
        player.atk += 1
        db.session.commit()
        return jsonify(player.as_dict()), 200
            
    else:
        return jsonify({'error': 'Could not access player..'}), 400
    
   
@app.route('/players/<int:player_id>/reset', methods=['POST'])
def reset_player(player_id):
    player = PlayerStats.query.get_or_404(player_id)
    if player:
        player.hp = 10
        player.atk = 1
        db.session.commit()
        return jsonify(player.as_dict()), 200
            
    else:
        return jsonify({'error': 'Could not access player..'}), 400
    
    
    # Routes for Matching 
    
@app.route('/players/<int:player_id>/join_lobby/<int:lobby_code>', methods=['POST'])
def join_lobby(player_id, lobby_code):
    player = PlayerStats.query.get_or_404(player_id)
    if player:
        player.lobby_code = lobby_code
        player.in_lobby = True
        db.session.commit()
        return jsonify(player.as_dict()), 200
    else:
        return jsonify({'error': 'Could not access player'}), 400

@app.route('/lobby/<int:lobby_code>', methods=['GET'])
def get_lobby_players(lobby_code):
    lobby_players = PlayerStats.query.filter_by(in_lobby=True, lobby_code = lobby_code).all()
    return jsonify([player.as_dict() for player in lobby_players])

@app.route('/players/<int:sender_id>/invite/<int:receiver_id>', methods=['POST'])
def send_invitation(sender_id, receiver_id):
    # Check if both sender_id and receiver_id are valid players
    sender = PlayerStats.query.get_or_404(sender_id)
    receiver = PlayerStats.query.get_or_404(receiver_id)

    # Check if an invitation between these players already exists
    existing_invitation = Invitation.query.filter_by(sender_id=sender_id, receiver_id=receiver_id).first()
    if existing_invitation:
        return jsonify({'message': 'Invitation already sent.'}), 400

    # Create a new invitation
    new_invitation = Invitation(sender_id=sender_id, receiver_id=receiver_id)
    db.session.add(new_invitation)
    db.session.commit()

    return jsonify({'message': 'Invitation sent successfully'}), 200

@app.route('/players/<int:receiver_id>/check_invitations', methods=['GET'])
def check_invitations(receiver_id):
    # Check if there are any pending invitations for the receiver
    pending_invitations = Invitation.query.filter_by(receiver_id=receiver_id, status='pending').all()

    return jsonify({'invitations': [inv.as_dict() for inv in pending_invitations]}), 200



socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('start_match')
def start_match():
    # Broadcast the start match event to all connected clients
    socketio.emit('match_started', broadcast=True)




if __name__ == '__main__':
    app.run( debug=True)
    socketio.run(app, debug=True)
