from flask import Flask, render_template, request, redirect, url_for
import json
from datetime import datetime

app = Flask(__name__)

# Store errors in memory
errors = []

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        error_id = request.form['error_id']
        error_message = request.form['error_message']
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        errors.append({
            'error_id': error_id,
            'error_message': error_message,
            'timestamp': timestamp
        })
        
        return redirect(url_for('index'))
    
    return render_template('index.html', errors=errors)

if __name__ == '__main__':
    # Add initial error
    errors.append({
        'error_id': '08d9eb82a81e475e8eaa36f5919f226d',
        'error_message': 'invalid_argument: an internal error occurred',
        'timestamp': '2025-01-09 23:56:07'
    })
    app.run(debug=True)
