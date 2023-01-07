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

mycursor.execute("SELECT * FROM items")

myresult = mycursor.fetchall()
print(myresult)

allData = []
for item in myresult:
    allData.append({"id": item[0], "name": item[1], "type": item[2], "discripsion": item[3], "price": item[4], "imageName":item[5]})
print(allData)
