from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the model, scaler, and label encoders
model = joblib.load('match_outcome_model.pkl')
scaler = joblib.load('scaler.pkl')
label_encoder_res = joblib.load('label_encoder_res.pkl')
label_encoder_start = joblib.load('label_encoder_start.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # Extract input data
    starting_side = data.get('starting_side')
    teamA_avg_kdr = data.get('teamA_avg_kdr', 0)
    teamA_avg_acs = data.get('teamA_avg_acs', 0)
    teamB_avg_kdr = data.get('teamB_avg_kdr', 0)
    teamB_avg_acs = data.get('teamB_avg_acs', 0)

    # Encode the starting_side, we cant feed it string because we transformed it into 0-1
    starting_side_encoded = label_encoder_start.transform([starting_side])[0]

    # Prepare features
    features = [
        starting_side_encoded,
        teamA_avg_kdr,
        teamA_avg_acs,
        teamB_avg_kdr,
        teamB_avg_acs
    ]

    # Make sure Features are in the correct format
    features = np.array(features).reshape(1, -1)

    # Scale features
    features_scaled = scaler.transform(features)

    
    prediction = model.predict(features_scaled)[0]
    flipped_prediction = 1 - prediction
    prediction_label = label_encoder_res.inverse_transform([flipped_prediction])[0]

    return jsonify({'prediction': prediction_label})

if __name__ == '__main__':
    app.run(port=5001)
