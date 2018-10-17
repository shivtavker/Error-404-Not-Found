import requests
import json

IITM = "12.9915,80.2345"
ADYAR = "13.0033,80.2550"
VELACHERY = "12.9758, 80.2205"
THARAMANI = "12.9786, 80.2409"
GUINDY = "13.0102, 80.2156"

locations = [IITM, ADYAR, VELACHERY, THARAMANI, GUINDY]

for location in locations:
    TEST = 'https://api.darksky.net/forecast/9191d936fc03d4c50faebb90012b5400/' + \
        location+'?exclude=currently,minutely,hourly,flags'
    r = requests.get(url=TEST)
    j = json.loads(r.text)
    if 'alerts' in j:
        # severe weather alerts
        print(j['alerts']['title'], j['alerts']['description'])
    for i in range(7):
        # precipitation probability and intensity
        ints = j['daily']['data'][i]['precipIntensity']
        prob = j['daily']['data'][i]['precipProbability']
        print(ints, prob)
