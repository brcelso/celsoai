# Define some greetings and questions
greetings = ["Olá, como vai!", "Olá, como posso te ajudar hoje?", "Bem-vindo a Gov Soft!"]
questions = [
    "Informe seu Nome:",
    "Informe seu ID:",
    "Escolha o Fabricante:",
    "Escolha o Software:",
    # Final question with options (integrated into the loop)
     "Como foi sua experiência?\n  1. Muito Satisfeito\n  2. Satisfeito\n  3. Neutro\n  4. Insatisfeito\n  5. Muito Insatisfeito"
]

# Import libraries
import pymongo

# Replace with your MongoDB connection string from the cloud provider
connection_string = "mongodb+srv://juca1405:ivGcWeCX3tYUZkVz@cluster0.5rumzet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Function to choose a random greeting
def greet():
    import random
    return random.choice(greetings)

# Main loop for conversation
def chat():
    user_responses = []  # List to store user responses
    client = pymongo.MongoClient(connection_string)
    db = client["BotDB"]  # Replace with your database name
    collection = db["AnswersDB"]  # Replace with your collection name

    print(greet())

    for question_index, question in enumerate(questions):
        answer = input(question + " ")

        # Extract the user's choice or handle invalid input for the final question
        if question.startswith("Experiência"):
            try:
                choice_index = int(answer) - 1
                if 0 <= choice_index < len(questions) - 1:  # Adjust for final question position
                    answer = questions[choice_index].split("\n")[1].split(". ")[1]  # Extract chosen option text
            except ValueError:
                print("Opção Inválida. Por favor digite um número de 1 a 5.")
                answer = "Opção não disponível"  # Or any placeholder for invalid answer

        user_responses.append(answer)
        print("Certo!")

    # Review and Edit Answers
    while True:
        print("\nRevise suas respostas:")
        for i, response in enumerate(user_responses):
            print(f"{i+1}. {response}")

        edit_choice = input("\nDeseja editar a resposta? (s/n) ou continuar? (c): ")
        if edit_choice.lower() == "c":
            break

        if edit_choice.lower() != "s":
            print("Opção Inválida. Por favor digite 's' ou 'n'.")
            continue

        try:
            edit_index = int(input("Digite a resposta que deseja editar (1-" + str(len(user_responses)) + "): "))
            if 1 <= edit_index <= len(user_responses):
                new_answer = input("Digite a nova resposta: ")
                user_responses[edit_index - 1] = new_answer
                print("Você editou com sucesso!")
            else:
                print("Número de resposta inválida. Digite novamente")
        except ValueError:
            print("Entrada inválida. Por favor digite um número:")

    # Confirm saving responses
    confirmation = input("Deseja salvar suas respostas? (s/n): ")
    if confirmation.lower() == "s":
        # Save user responses to MongoDB collection
        collection.insert_one({"responses": user_responses})  # Example document structure
        print("Respostas salvas com sucesso!")
    else:
        print("Respostas descartadas.")

    # Close the connection after use
    client.close()

# Start the conversation
chat()

print("Tenha um excelente dia!")


