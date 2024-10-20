from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os

os.environ["GOOGLE_API_KEY"] = "AIzaSyD2_H1OBQ6mlxlYIJnKAaMIV4TEcRIDbO4"

app = Flask(__name__)


conversation_history = []

@app.route("/")
def index():
    return render_template('chat.html')

@app.route("/get", methods=['POST'])
def chat():
    global conversation_history
    x = request.get_json()
    y = x.get('msg')
    
    conversation_history.append(f"User: {y}")
    bot_response1 = get_chat_response(y, conversation_history)
    bot_response = bot_response1.replace("*", "").replace("**", "").replace("***", "")
    conversation_history.append(f"Bot: {bot_response}")
    return jsonify({"response": str(bot_response)})

def get_chat_response(text, history):
    conversation_context = "\n".join(history)
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content(f"{conversation_context}\nUser: {text}")
    
    return response.text

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
