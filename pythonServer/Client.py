import json
from json import JSONEncoder
import numpy as np

class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return JSONEncoder.default(self, obj)

class Client():
    def __init__(self, socket):
        self.socket = socket
        self.origin = socket.origin   
        self.username = ''
        self.email = ''
        self.firstName = ''
        self.lastName = ''
        self.fullName = ''
        self.password = ''
        self.isOnline = False
        self.isSignedIn = False

    async def send(self, data):
        await self.socket.send(json.dumps(data, indent=4, cls=NumpyArrayEncoder))

    def saveData(key, value, fileName):
        try:
            with open(fileName, "r+") as file:
                data = json.load(file)
                data[key] = value
                file.seek(0)
                json.dump(data, file, indent=4)
        except:
            with open(fileName, "w+") as file:
                json.dump({}, file, indent=4)
            with open(fileName, "r+") as file:
                data = json.load(file)
                data[key] = value
                file.seek(0)
                json.dump(data, file, indent=4)
    
    def loadData(fileName):
        try:
            with open(fileName, "r") as file:
                return json.load(file)
        except:
            with open(fileName, "w+") as file:
                json.dump({}, file)
            with open(fileName, "r") as file:
                return json.load(file)

    async def signUp(self, username, email, password, firstName, lastName):
        signUpData = self.loadData("signUpData")
        if (username in signUpData):
            await self.send({"function": "signUp", "data": {"status": False}})
        else:
            self.saveData(username,{"firstName": firstName, 
                                    "lastName":lastName, 
                                    "email":email, 
                                    "username":username,
                                    "password":password}, "signUpData")
            await self.send({"function": "signUp","status": True, "data": {}})
    
    async def signIn(self, username, password):
        signUpData = self.loadData("signUpData")
        if (username in signUpData and not self.isSignedIn):
            if (password == signUpData[username]["password"]):
                if users[signUpData[username]["username"]].isOnline:
                    for conn in connected:
                        if conn.isSignedIn:
                            if conn.username == signUpData[username]["username"]:
                                await conn.signOut()
                self.isSignedIn = True
                self.username = signUpData[username]["username"]
                self.email = signUpData[username]["email"]
                self.password = password
                self.firstName = signUpData[username]["firstName"]
                self.lastName = signUpData[username]["lastName"]
                await users[self.username].signIn(self.socket)
            else:
                await self.send({"function": "signIn", "status": False, "data": {"message": "Incurrect Password"}})
        else:
                await self.send({"function": "signIn", "status": False, "data": {"message": "Incurrect Username"}})

    async def signOut(self):
        if self.isSignedIn:
            try:
                await users[self.username].signOut()  
            except:
                pass
            self.isSignedIn = False
   
    def __str__(self):
        if self.isSignedIn:
            return "Client Is Signed In as: " + self.username
        else:
            return "User Is Not Signed In"
