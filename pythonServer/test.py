import mysql.connector
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="6604",
  database="shop"
)
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

if mydb.cursor:
  print("connection sucssful")

  mycursor = mydb.cursor()

  mycursor.execute("SELECT * FROM shoppingCart")

  cartResult = mycursor.fetchall()
  
  cartData = []
  user="Mohamed.shahin@gmail.com"
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
    

  userCartId = '1'
  userCartMode = '-'
  if userCartMode == "+":
    for i in cartData:

      if userCartId in x:
        (y[x.index(userCartId)]) = str(int (y[x.index(userCartId)]) + 1)
        print (x)
        print (y)
        print ("1")
        insertCart(x,y,z)
      elif userCartId not in x:

        x.append(userCartId)
        y.append("1")
        del x[0]
        del y[0]
        print (x)
        print (y)
        print("2")
        insertCart(x,y,z)
  elif userCartMode=='-':

    for i in cartData:

      if (userCartId in x) and (int(y[x.index(userCartId)])>=2):
        (y[x.index(userCartId)]) = str(int (y[x.index(userCartId)]) - 1)
        print (x)
        print (y)
        print ("3")
        insertCart(x,y,z)
      elif userCartId in x and int(y[x.index(userCartId)])==1:
        if len(x)==1:
          x.append("")
          y.append("")

        del y[x.index(userCartId)]
        del x[x.index(userCartId)]
        print (x)
        print (x)
        print ("4")
        insertCart(x,y,z)
    
   # for i in cartData:
  #    if (userCartId not in i.get("ID_ITEMS")) :
    print("this Item is not in cart")
    
