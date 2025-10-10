
import requests

# Catfacts

r = requests.get("https://catfact.ninja/fact")
print("Dato curioso sobre gatos: ", r.json()['fact'])
print("\n \n")

# Chuck Norris

response = requests.get("https://api.chucknorris.io/jokes/random")
data = response.json()
chiste = data['value']
print("Chiste de Chuck Norris: ", chiste)
print("\n \n")
