from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
import maritalk

app = Flask(__name__)

# Load the API key from the .env file
load_dotenv()
key = os.getenv("MARITACAAI-KEY")

# Create a model instance
model = maritalk.MariTalk(
	key=key,
	model="sabia-3"  # No momento, suportamos os modelos sabia-3, sabia-2-medium e sabia-2-small
)

@app.route('/generate', methods=['POST'])
def generate():
	data = request.json
	prompt = data.get('prompt')
	response = model.generate(prompt, max_tokens=200)
	answer = response["answer"]
	return jsonify({'answer': answer})

if __name__ == '__main__':
	app.run(debug=True)