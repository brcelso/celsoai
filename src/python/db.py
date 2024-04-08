import pymongo

# Replace with your MongoDB connection string
connection_string = "mongodb+srv://juca1405:ivGcWeCX3tYUZkVz@cluster0.5rumzet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = pymongo.MongoClient(connection_string)
db = client["BotDB"]  # Replace with your database name
collection = db["AnswersDB"]  # Replace with your collection name

# Fetch all documents from the collection
all_data = collection.find()

# Print each document in a formatted way
for document in all_data:
   print(f"Document: {document}")

client.close()  # Close the connection
