from flask import Flask, request, jsonify
from flask_cors import CORS
from detoxify import Detoxify
import json

app = Flask(__name__)
CORS(app)

print("Loading Detoxify model...")
model = Detoxify('original')
print("Model loaded successfully!")

@app.route('/api/check-toxicity', methods=['POST'])
def check_toxicity():
    try:
        print("Request received!")
        data = request.get_json()
        print(f"Data: {data}")
        
        text = data.get('text', '')
        
        if not text or len(text.strip()) == 0:
            return jsonify({'is_toxic': False, 'scores': {}})
        
        print(f"Checking toxicity for: {text}")
        results = model.predict(text)
        print(f"Raw results: {results}")
        
        # Handle the results properly
        toxicity_score = float(results.get('toxicity', 0))
        severe_toxicity = float(results.get('severe_toxic', 0))
        obscene_score = float(results.get('obscene', 0))
        threat_score = float(results.get('threat', 0))
        insult_score = float(results.get('insult', 0))
        identity_hate = float(results.get('identity_hate', 0))
        
        is_toxic = toxicity_score >= 0.7
        
        response = {
            'is_toxic': is_toxic,
            'scores': {
                'toxicity': round(toxicity_score, 3),
                'severe_toxicity': round(severe_toxicity, 3),
                'obscene': round(obscene_score, 3),
                'threat': round(threat_score, 3),
                'insult': round(insult_score, 3),
                'identity_hate': round(identity_hate, 3)
            }
        }
        
        print(f"Sending response: {response}")
        return jsonify(response)
        
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'model': 'detoxify-original'})

if __name__ == '__main__':
    print("Starting Flask app on http://0.0.0.0:5001")
    app.run(host='0.0.0.0', port=5001, debug=True)
