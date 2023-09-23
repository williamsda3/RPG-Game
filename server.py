from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///player_stats.db'
db = SQLAlchemy(app)

class PlayerStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    in_lobby = db.Column(db.Boolean, default=False)  # New field to indicate if a player is in the lobby
    hp = db.Column(db.Integer)
    atk = db.Column(db.Integer)

    def as_dict(self):
        return {
            'id': self.id,
            'hp': self.hp,
            'atk': self.atk,
            'in_lobby': self.in_lobby
        }

# Initialize the database
with app.app_context():
    db.create_all()

# Route


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

@app.route('/players',methods=['POST'])
def create_player():
    json ={ "atk": 1,"hp": 10, "in_lobby": False}
    data = json
    if not data or 'hp' not in data or 'atk' not in data :
        return jsonify({'error': 'Invalid data'}), 400

    player = PlayerStats(hp=data['hp'], atk=data['atk'])
    db.session.add(player)
    db.session.commit()
    return jsonify({'message': 'player created successfully'}), 201


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
    
@app.route('/players/<int:player_id>/join_lobby', methods=['POST'])
def join_lobby(player_id):
    player = PlayerStats.query.get_or_404(player_id)
    if player:
        player.in_lobby = True
        db.session.commit()
        return jsonify(player.as_dict()), 200
    else:
        return jsonify({'error': 'Could not access player'}), 400

@app.route('/lobby', methods=['GET'])
def get_lobby_players():
    lobby_players = PlayerStats.query.filter_by(in_lobby=True).all()
    return jsonify([player.as_dict() for player in lobby_players])



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
