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


def ping(data):
    return {"function":"pong", "data":{"message": data["message"]}}

def get_all_data(data):
    mycursor = mydb.cursor()

    mycursor.execute("SELECT * FROM items")

    myresult = mycursor.fetchall()
    allData = []
    for item in myresult:
        allData.append({"id": item[0], "name": item[1], "type": item[2], "description": item[3], "price": float(item[4]), "imageName":item[5]})
    print(allData)

    return {"function":"onGetAllData", "data":{"allData":allData}}
    
def signIn(data):
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
          return {"function":"onSignIn", "data":{'status':2,"user":i.get("user"),"firstName":i.get("firstName"),"lastName":i.get("lastName")}} 
        print("wrong password") 
        return {"function":"onSignIn", "data":{'status':1}}

      print("wrong username")
      return {"function":"onSignIn", "data":{'status':0}}
  

    
  


if __name__ == "__main__":
    resposeFunctions = {"ping": ping,
                        "getAllData": get_all_data,
                        "signIn": signIn}
    serveIp, port = "127.0.0.1", 7000
    server = AnasServer(serveIp, port, resposeFunctions)
    server.run()

