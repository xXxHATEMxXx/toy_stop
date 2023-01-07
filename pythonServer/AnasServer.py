from Client import Client
import asyncio
import json
from random import randint
from sqlite3 import connect
from tkinter.filedialog import asksaveasfile
import websockets
import locale
from datetime import datetime

class AnasServer():

    def __init__(self, serveIp, port, resposeFunctions) -> None:
        self.serveIp = serveIp
        self.port = port
        self.clients = set()
        self.resposeFunctions = resposeFunctions

    async def update_all_clients(self):
        pass

    def run(self):      
        locale.setlocale( locale.LC_ALL, 'en_US.UTF-8' ) 
        asyncio.run(self.mainServer())

    async def echo(self, websocket, path):
        # This code will run win someone connects
        #print("Someone connected from the origin: ", websocket.origin)
        print("Someone Connected")
        client = Client(websocket)
        self.clients.add(client)
        print("Clients connected:", len(self.clients))
        #try:
        async for message in websocket:
            # This Code will run when a messeage is recived
            #print("recived :" + message)
            message = json.loads(message)
            await client.send(self.resposeFunctions[message["function"]](message["data"]))
            """ try:
                pass
            except:
                print("This message is not in Anas stadard format")
                await websocket.send(json.dumps({"function":"error", "data":{"message":"You sent a message that is not Anas standard"}}))
                print(message) """
            await self.update_all_clients()
        #except:
            # This code will run when something wrong happens
        print("something went wrong")
        #finally:
            # This code will run when a user Disconnects
        #print("Someone Disconnected from the origin: " + str(websocket.origin))
        try:
            await client.signOut()
        except:
            pass
        self.clients.remove(client)
        print("Someone Disconnected")
        print("Clients connected:", len(self.clients))
        await self.update_all_clients()

    async def mainServer(self):
        global server 
        server = websockets.serve(self.echo, self.serveIp, self.port)
        print(f"Serving {self.serveIp}:{self.port}")
        async with server:
            await asyncio.Future()  # run forever
        

    def getCurrentTime():
        now = datetime.now()
        current_time = now.strftime("%H:%M:%S")
        return current_time
        
    def generateCode(refrance, length):
        digits = '0123456789'
        letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        all_chars = digits + letters

        # find how many valid strings there are with their first letter in position i
        pos_weights = [10**i * 6 * 16**(length-1-i) for i in range(length)]
        pos_c_weights = [sum(pos_weights[0:i+1]) for i in range(length + 1)]

        # choose a random slot among all the allowed strings
        r = random.randint(0, pos_c_weights[-1])

        # find the position for the first letter in the string
        first_letter = bisect.bisect_left(pos_c_weights, r) - 1

        # choose the corresponding string from among all that fit this pattern
        offset = r - pos_c_weights[first_letter]
        val = ''
        # convert the offset to a collection of indexes within the allowed strings 
        # the space of allowed strings has dimensions
        # 10 x 10 x ... (for digits) x 6 (for first letter) x 16 x 16 x ... (for later chars)
        # so we can index across it by dividing into appropriate-sized slices
        for i in range(length):
            if i < first_letter:
                offset, v = divmod(offset, 10)
                val += digits[v]
            elif i == first_letter:
                offset, v = divmod(offset, 6)
                val += letters[v]
            else:
                offset, v = divmod(offset, 16)
                val += all_chars[v]
        if val in refrance:
            return generateCode()
        return val


