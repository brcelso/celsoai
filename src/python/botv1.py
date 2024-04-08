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
        return " Utilize no máximo 100 caracteres."
    elif "adobe" in demand.lower():
        # New response if the first answer contains "adobe"
        return "OK, vamos instalar o Adobe Creative Cloud!"
    elif "excel" in demand.lower() or "office" in demand.lower():
        # Ask another question within the function
        tools_question = "Já que estamos falando de Planilhas, conte-nos mais sobre sua demanda: "
        tools_answer = input(tools_question)
        if "cubo" in tools_answer.lower() or "query" in tools_answer.lower() or "base de dados" in tools_answer.lower():
            lines_question = "De quantas linhas estamos falando? "
            # Simulate user input for demonstration (remove in actual use)
            # simulated_number = input(lines_question)
            # While loop for input validation (replace with actual input)
            while True:
                simulated_number = input(lines_question)
                if simulated_number.isdigit():  # Check only for digits
                    try:
                        number_of_lines = int(simulated_number)
                        if number_of_lines > 1048576:
                            response = "OK, vamos disponibilizar o Microsoft Office!"
                        else:
                            response = "Neste caso, recomendamos utilizar o Google Workspace!"
                    except ValueError:
                        print(" Entre com um número válido de linhas.")
                        continue  # Continue the loop if input is invalid
                else:
                    print(" Entre com um número válido de linhas.")
                    continue  # Continue the loop if input is invalid
                try:
                    collection.insert_one({"demand": demand, "response": response})
                except Exception as e:
                    print("Error saving to MongoDB:", e)
                return response
        else:
            return "Neste caso, recomendamos utilizar o Google Workspace!"
    else:
        return " Entendo. Em que posso te ajudar hoje?"


# Replace with your actual MongoDB connection string (ensure security!)
connection_string = "mongodb+srv://juca1405:ivGcWeCX3tYUZkVz@cluster0.5rumzet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Connect to MongoDB and get the collection (replace with your database/collection names)
client = create_mongodb_connection(connection_string)
db = client["BotDB"]  # Replace with your database name
collection = db["AnswersDB"]  # Replace with your collection name

# Main loop for user interaction
while True:
    demand = input("Qual Software você está buscando hoje? ")
    response = analyze_demand(demand, collection)
    print(response)
    if input("Deseja sair? (s/n): ").lower() == "s":
        break

client.close()  # Close the connection

print(" Obrigado por usar nosso chat!")