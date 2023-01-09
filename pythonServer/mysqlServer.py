import mysql.connector
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="6604",
  database="shop"
)
if mydb.cursor:
  print("connection sucssful")
mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM users")

myresult = mycursor.fetchall()

allData = []
for item in myresult:
    allData.append(item[0], item[1],  item[2], item[3])
print(myresult)

def addToCart(data, client):

  mycursor = mydb.cursor()

  mycursor.execute("SELECT * FROM shoppingCart")

  cartResult = mycursor.fetchall()
  print(cartResult)
  cartData = []
  user=data["email"]
  for item in cartResult:
    cartData.append ({"user": item[0], "ID_ITEMS": item[1].split(","), "Quantity": item[2].split(",")})
  if not client.isSignedIn:
    return {"function": "onAddToCart", "data":{"status":1}}
  for i in cartData:
    if i.get("user").lower() == user.lower():
      print (i.get("ID_ITEMS"))
      print (i.get("Quantity"))

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
