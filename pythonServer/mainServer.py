from AnasServer import AnasServer
import mysql.connector 

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="6604",
  database="shop"
)
if mydb.cursor:
  print("connection sucssful")


def ping(data, client):
    return {"function":"pong", "data":{"message": data["message"]}}

def get_all_data(data, client):
    mycursor = mydb.cursor()

    mycursor.execute("SELECT * FROM items")

    myresult = mycursor.fetchall()
    allData = []
    for item in myresult:
        allData.append({"id": item[0], "name": item[1], "type": item[2], "description": item[3], "price": float(item[4]), "imageName":item[5]})
    print(allData)

    return {"function":"onGetAllData", "data":{"allData":allData}}
    
def signIn(data, client):
  mycursor = mydb.cursor()

  mycursor.execute("SELECT * FROM users")

  usersResult = mycursor.fetchall()

  email=data["email"]
  password=data["password"]
  print("email", email)
  print("password", password)
  users = {}
  for item in usersResult:
    users[item[0]] = {"user": item[0], "password": item[1], "firstName": item[2], "lastName": item[3]}
  print(users)
  if email in users.keys():
    if users.get(email).get("password") == password:
        print("u are ok")
        client.isSignedIn = True
        client.username= users.get(email).get("user")
        return {"function":"onSignIn", "data":{'status':0,"user":users.get(email).get("user"),"firstName":users.get(email).get("firstName"),"lastName":users.get(email).get("lastName")}} 
    else:
      print("wrong password") 
      return {"function":"onSignIn", "data":{'status':1}}
  else:
    print("wrong username")
    return {"function":"onSignIn", "data":{'status':2}}
    
def addToCart(data, client):

  mycursor = mydb.cursor()

  mycursor.execute("SELECT * FROM shoppingCart")

  cartResult = mycursor.fetchall()
  cartData = {}

  for item in cartResult:
    cartData[item[0]] = {"user": item[0], "ID_ITEMS": item[1].split(","), "Quantity": item[2].split(",")}
  if not client.isSignedIn:
    return {"function": "onAddToCart", "data":{"status":1}}
  userCartId = cartData[client.username]["ID_ITEMS"]
  userCartQ = cartData[client.username]["Quantity"]

  itemId = data["itemId"]
  mode = data["mode"]
  if mode == "+":
    if itemId in userCartId:
      item_index = userCartId.index(itemId)
      userCartQ[item_index] = str(int(userCartQ[item_index]) + 1)
    else:
      userCartId.append("," + str(itemId))
      userCartQ.append(",1")
  if mode == "-":
    if itemId in userCartId:
      item_index = userCartId.index(itemId)
      if userCartQ[item_index] == "1":
        del userCartId[item_index]
        del userCartQ[item_index]
      else:
        userCartQ[item_index] = str(int(userCartQ[item_index]) - 1)
    else:
      pass
  updatedUseCartId = ",".join(userCartId)
  updatedUseCartQ = ",".join(userCartQ)
  print(updatedUseCartId)
  print(updatedUseCartQ)








if __name__ == "__main__":
    resposeFunctions = {"ping": ping,
                        "getAllData": get_all_data,
                        "addToCart": addToCart,
                        "signIn": signIn}
    serveIp, port = "127.0.0.1", 7000
    server = AnasServer(serveIp, port, resposeFunctions)
    server.run()

