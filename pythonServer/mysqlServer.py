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

