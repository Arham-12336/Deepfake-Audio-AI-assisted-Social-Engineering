#!/usr/bin/env python
# coding: utf-8

# In[7]:


# import os
# import librosa
# import numpy as np
# from joblib import load
# import sys

# # Load the saved model
# model_filename = "deepfake_detection_model.joblib"
# classifier = load(model_filename)
# print("Model loaded from:", model_filename)

# # Function to extract features from a new audio file
# def extract_features(file_path):
#     audio_data, _ = librosa.load(file_path, sr=None)
#     mfccs = librosa.feature.mfcc(y=audio_data, sr=16000, n_mfcc=40)
#     return np.mean(mfccs.T, axis=0)

# # Function to predict if the audio is real or fake
# def predict_audio(file_path):
#     features = extract_features(file_path)
#     prediction = classifier.predict([features])[0]
#     if prediction == 0:
#         return "Real"
#     else:
#         return "Fake"

# # Path to the new audio file to be tested
# new_audio_file = "C:/Users/ArhamShams/Desktop/Deep Fake testing/test/real.wav"# Update with the path to your audio file

# # Make prediction on the new audio file
# result = predict_audio(new_audio_file)
# print("Prediction for", os.path.basename(new_audio_file) + ":", result)


# In[28]:


import os
import librosa
import numpy as np
from joblib import load
import sys
def test_audio(file_path):
    # Load the saved model
    model_filename = "deepfake_detection_model.joblib"
    classifier = load(model_filename)

    # Function to extract features from a new audio file
    def extract_features(file_path):
        audio_data, _ = librosa.load(file_path, sr=None)
        mfccs = librosa.feature.mfcc(y=audio_data, sr=16000, n_mfcc=40)
        return np.mean(mfccs.T, axis=0)

    # Function to predict if the audio is real or fake
    def predict_audio(file_path):
        features = extract_features(file_path)
        prediction = classifier.predict([features])[0]
        if prediction == 0:
            return "Real"
        else:
            return "Fake"

    # Make prediction on the new audio file
    result = predict_audio(file_path)
    return result
    
if __name__ == "__main__":
    file_path = sys.argv[1]
    response=test_audio(file_path)
    print(response)    


# In[26]:





# In[12]:





# In[ ]:



