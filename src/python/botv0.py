import pymongo

def create_mongodb_connection(connection_string):
  """Creates a connection to the MongoDB database."""
  client = pymongo.MongoClient(connection_string)
  return client

def analyze_demand(demand, collection):
  """Analyzes the user's demand and provides a response, saving it to MongoDB.

  Args:
      demand: The user's input as a string.
      collection: A pymongo collection object for saving data.

  Returns:
      A string containing the response to the user.
  """
  if len(demand) > 100:
    return " Your demand is too long. Please keep it brief."
  elif "excel" in demand.lower() or "office" in demand.lower():
    # Ask another question within the function
    tools_question = " Since we're talking about Planilhas, which tools do you need?"
    tools_answer = input(tools_question)
    if "cubo" in tools_answer.lower() or "query" in tools_answer.lower() or "base de dados" in tools_answer.lower():
      lines_question = " How many lines has your Planilhas?"
      # Simulate user input for demonstration (remove in actual use)
      # simulated_number = input(lines_question)
      # While loop for input validation (replace with actual input)
      while True:
        simulated_number = input(lines_question)
        if simulated_number.isdigit():  # Check only for digits
          try:
            number_of_lines = int(simulated_number)
            if number_of_lines > 80000:
              response = " OK, Microsoft Office is the right software for you. We recommend checking for specific limitations based on your Planilhas size."
            else:
              response = " In this case, we suggest that you use Google Sheets as a Software."
          except ValueError:
            print(" Please enter a valid number of lines.")
            continue  # Continue the loop if input is invalid
        else:
          print(" Please enter a valid number of lines.")
          continue  # Continue the loop if input is invalid
        try:
          collection.insert_one({"demand": demand, "response": response})
        except Exception as e:
          print("Error saving to MongoDB:", e)
        return response
    else:
      return " Great! Let me know if you have any questions about those Planilhas tools."
  else:
    return " I understand. How can I help you with your demand?"

# Replace with your actual MongoDB connection string (ensure security!)
connection_string = "mongodb+srv://juca1405:ivGcWeCX3tYUZkVz@cluster0.5rumzet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Connect to MongoDB and get the collection (replace with your database/collection names)
client = create_mongodb_connection(connection_string)
db = client["BotDB"]  # Replace with your database name
collection = db["AnswersDB"]  # Replace with your collection name

# Main loop for user interaction
while True:
  demand = input("What's your demand today? ")
  response = analyze_demand(demand, collection)
  print(response)
  if input("Do you want to exit? (y/n): ").lower() == "y":
    break

client.close()  # Close the connection

print("Thank you for using the chat!")