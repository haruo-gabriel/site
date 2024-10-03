#!/bin/bash

# Activate the virtual environment
# You need to have your environment already created
source venv/bin/activate

# Install dependencies
pip install flask flask-cors

# Run the server
python3 src/maritaca/main.py