import requests
import json
import os

def clear_terminal():
    if os.name == 'nt': 
        os.system('cls')


p1 = "http://127.0.0.1:5000/players/1"
p2 = "http://127.0.0.1:5000/players/2"
def get_stats():
    player1 = requests.get("http://127.0.0.1:5000/players/1")
    player2 = requests.get("http://127.0.0.1:5000/players/2")

    p1_data = player1.json()
    p2_data = player2.json()

    print(f'Player 1 \nHP: {p1_data["hp"]} ATK: {p1_data["atk"]}\n')
    print(f'Player 2 \nHP: {p2_data["hp"]}   ATK: {p2_data["atk"]}')

def player1_take_damage(dmg):
    
    posted = requests.post(f'http://127.0.0.1:5000/players/1/reduce/{dmg}')
    if posted.status_code < 300:
        print(f'Player1 took {dmg} damage!')
    else:
         print(posted.json()['message'])
def player2_take_damage(dmg):
    
    posted = requests.post(f'http://127.0.0.1:5000/players/2/reduce/{dmg}')
    if posted.status_code < 300:
        print(f'Player1 took {dmg} damage!')
    else:
        print(posted.json()['message'])
def charge(player):
    posted = requests.post(f'http://127.0.0.1:5000/players/{player}/charge')
    if posted.status_code < 300:
        print(f'Player{player} charged!')
    else:
        print(posted.json()['message'])
get_stats()
while 1:
    move = input("whats the move?\n")
    if move == "a":
        player1_take_damage(1)
        clear_terminal()
        get_stats()
    elif move == "c":
        charge(2)
        clear_terminal()
        get_stats()
    else:
        print("did not attack..")
        
