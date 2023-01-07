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

    return {"function":"onGetAllData", "data":{"allData":allData}}
    
if __name__ == "__main__":
    resposeFunctions = {"ping": ping,
                        "getAllData": get_all_data}
    serveIp, port = "127.0.0.1", 7000
    server = AnasServer(serveIp, port, resposeFunctions)
    server.run()

