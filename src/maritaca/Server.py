from flask import Flask, request, jsonify
from flask_cors import CORS
from Maritaca import Maritaca

class Server:
	def __init__(self) -> None:
		self.server = Flask(__name__)
		CORS(self.server)
		self.response_generator = Maritaca()
		self.setup_routes()

	def setup_routes(self):
		self.server.route('/generate', methods=['POST'])(self.generate)
		self.server.route('/fix', methods=['POST'])(self.generate_fix)

	def generate(self):
		try:
			data = request.json
			if not data or 'prompt' not in data:
					return jsonify({'error': 'Invalid input'}), 400

			prompt = data['prompt']
			answer = self.response_generator.generate_response(prompt, 'generate', None)
			print(answer)
			return jsonify({'answer': answer})
		except Exception as e:
			print(f"Error: {e}")
			return jsonify({'error': 'Internal server error'}), 500

	def generate_fix(self):
		try:
			data = request.json
			if not data or 'prompt' not in data:
					return jsonify({'error': 'Invalid input'}), 400

			prompt = data['prompt']
			html = data['html']
			answer = self.response_generator.generate_response(prompt, 'fix', html)
			print(answer)
			return jsonify({'answer': answer})
		except Exception as e:
			print(f"Error: {e}")
			return jsonify({'error': 'Internal server error'}), 500
	
	def run(self):
		self.server.run(debug=True)
