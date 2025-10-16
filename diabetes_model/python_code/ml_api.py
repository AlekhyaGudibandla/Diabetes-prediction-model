from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import json


app = FastAPI()

# Enable CORS so the browser-based frontend can call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok", "service": "diabetes-prediction-api", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "healthy"}

class model_input(BaseModel):
    
    pregnancies : int
    Glucose : int
    BloodPressure : int
    SkinThickness : int
    Insulin : int
    BMI : float
    DiabetesPedigreeFunction : float
    Age : int       
        
# loading the saved model
diabetes_model = pickle.load(open('diabetes_model.sav', 'rb'))

@app.post('/diabetes_prediction')
def diabetes_predd(input_parameters : model_input):
    
    input_data = input_parameters.json()
    input_dictionary = json.loads(input_data)
    
    preg = input_dictionary['pregnancies']
    glu = input_dictionary['Glucose']
    bp = input_dictionary['BloodPressure']
    skin = input_dictionary['SkinThickness']
    insulin = input_dictionary['Insulin']
    bmi = input_dictionary['BMI']
    dpf = input_dictionary['DiabetesPedigreeFunction']
    age = input_dictionary['Age']
    
    
    input_list = [preg, glu, bp, skin, insulin, bmi, dpf, age]
    
    prediction = diabetes_model.predict([input_list])
    
    if (prediction[0] == 0):
        return {"message": "The person is not diabetic", "prediction": 0}
    else:
        return {"message": "The person is diabetic", "prediction": 1}
    
    



