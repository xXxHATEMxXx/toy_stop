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

def insertCart(data1,data2,user):
    
    mycursor = mydb.cursor()

    sql1 = "UPDATE shoppingCart SET ID_ITEMS = %s WHERE email = %s"
    sql2 = "UPDATE shoppingCart SET Quantity = %s WHERE email = %s"

    val1=(listToString(data1),user)
    val2=(listToString(data2),user)

    mycursor.execute(sql1,val1)
    mycursor.execute(sql2,val2)

    mydb.commit()
    print(mycursor.rowcount, "record(s) affected")

def listToString(s):
    listToStr = ','.join([str(elem) for elem in s])
 
    print(listToStr)
    return(listToStr)

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

def getCart(user):
  mycursor = mydb.cursor()

  mycursor.execute("SELECT * FROM shoppingCart")

  cartResult = mycursor.fetchall()
  
  cartData = []
  for item in cartResult:
    cartData.append ({"user": item[0], "ID_ITEMS": item[1].split(','), "Quantity": item[2].split(',')})
  print(cartData)
  for i in cartData:
    if i.get("user").lower() == user.lower():
      z=(i.get("user"))
      x=(i.get("ID_ITEMS"))
      y= (i.get("Quantity"))
  cart = {}
  for index, itemId in enumerate(x):
    cart[itemId] = y[index]
  return cart

def signIn(data, client):
  mycursor = mydb.cursor()

  mycursor.execute("SELECT * FROM users")

  usersResult = mycursor.fetchall()

  email=data["email"]
  password=data["password"]
  print("email", email)
  print("password", password)
  users = []
  for item in usersResult:
    users.append({"user": item[0], "password": item[1], "firstName": item[2], "lastName": item[3]})
  print(users)
  for i in users:
    if i.get("user").lower() == email.lower():
      if i.get("password") == password:
        print("u are ok")
        client.isSignedIn = True
        client.username= i.get("user")
        client.cart = getCart(i.get("user"))
        return {"function":"onSignIn", "data":{'status':0,
                                                "user":i.get("user"),
                                                "firstName":i.get("firstName"),
                                                "lastName":i.get("lastName"),
                                                "shoppingCart": client.cart},} 
      print("wrong password") 
      return {"function":"onSignIn", "data":{'status':1}}

  print("wrong username")
  return {"function":"onSignIn", "data":{'status':2}}





def addToCart(data, client):
  mycursor = mydb.cursor()

  mycursor.execute("SELECT * FROM shoppingCart")

  cartResult = mycursor.fetchall()
  
  cartData = []
  user = client.username
  for item in cartResult:
    cartData.append ({"user": item[0], "ID_ITEMS": item[1].split(','), "Quantity": item[2].split(',')})
  print(cartData)
  for i in cartData:
    if i.get("user").lower() == user.lower():

      z=(i.get("user"))
      
      x=(i.get("ID_ITEMS"))
      y= (i.get("Quantity"))
      print(x)
      print(y)
      
    

  userCartId = data["itemId"]
  userCartMode = data["mode"]
  if userCartMode == "+":
    for i in cartData:

      if userCartId in x:
        (y[x.index(userCartId)]) = str(int (y[x.index(userCartId)]) + 1)
        print ("1")
        insertCart(x,y,z)
        client.cart = {}
        for index, itemId in enumerate(x):
          client.cart[itemId] = y[index]
        return {"function": "onAddToShoppingCart", "data":{"newCart": client.cart, "status": "1"}}
      elif userCartId not in x:
        x.append(userCartId)
        y.append("1")
        del x[0]
        del y[0]
        print("2")
        insertCart(x,y,z)
        client.cart = {}
        for index, itemId in enumerate(x):
          client.cart[itemId] = y[index]
        return {"function": "onAddToShoppingCart", "data":{"newCart": client.cart, "status": "2"}}
  elif userCartMode=='-':

    for i in cartData:

      if (userCartId in x) and (int(y[x.index(userCartId)])>=2):
        (y[x.index(userCartId)]) = str(int (y[x.index(userCartId)]) - 1)
        print ("3")
        insertCart(x,y,z)
        client.cart = {}
        for index, itemId in enumerate(x):
          client.cart[itemId] = y[index]
        return {"function": "onAddToShoppingCart", "data":{"newCart": client.cart, "status": "3"}}
      elif userCartId in x and int(y[x.index(userCartId)])==1:
        if len(x)==1:
          x.append("")
          y.append("")

        del y[x.index(userCartId)]
        del x[x.index(userCartId)]
        print ("4")
        insertCart(x,y,z)
        client.cart = {}
        for index, itemId in enumerate(x):
          client.cart[itemId] = y[index]
        return {"function": "onAddToShoppingCart", "data":{"newCart": client.cart, "status": "4"}}

    
   # for i in cartData:
  #    if (userCartId not in i.get("ID_ITEMS")) :
    print("this Item is not in cart")
    return {"function": "onAddToShoppingCart", "data":{"status": "5"}}
    
    
    

  #itemId = data["itemId"]
  #mode = data["mode"]
  #if mode == "+":
  #  if itemId in userCartId:
  #    item_index = userCartId.index(itemId)
  #    userCartQ[item_index] = str(int(userCartQ[item_index]) + 1)
  #  else:
  #    userCartId.append("," + str(itemId))
  #    userCartQ.append(",1")
  #if mode == "-":
  #  if itemId in userCartId:
  #    item_index = userCartId.index(itemId)
  #    if userCartQ[item_index] == "1":
  #      del userCartId[item_index]
  #      del userCartQ[item_index]
  #    else:
  #      userCartQ[item_index] = str(int(userCartQ[item_index]) - 1)
  #  else:
  #    pass
  #updatedUseCartId = ",".join(userCartId)
  #updatedUseCartQ = ",".join(userCartQ)
  #print(updatedUseCartId)
  #print(updatedUseCartQ)








if __name__ == "__main__":
    resposeFunctions = {"ping": ping,
                        "getAllData": get_all_data,
                        "addToCart": addToCart,
                        "signIn": signIn}
    serveIp, port = "127.0.0.1", 7000
    server = AnasServer(serveIp, port, resposeFunctions)
    server.run()

