# Diabetes Prediction Model

This project predicts whether an individual has diabetes or not using the **PIMA Indians Diabetes Dataset**. The model is built using **Support Vector Machine (SVM)** and is trained on various medical parameters to predict the likelihood of diabetes.

## Key Features

- **SVM Classifier**: Utilizes the **Support Vector Machine (SVM)** algorithm to classify diabetes.
- **Data Preprocessing**: The dataset is split into training and test sets using **train_test_split**.
- **Model Evaluation**: The model's performance is evaluated using the **accuracy score**.
- **Prediction**: Predicts the diabetes status for new input data.
- **Model Saving**: The trained model is saved as a `.sav` file using **pickle** and can be loaded for future predictions.

## Tools & Technologies

- **Python**: For data processing and model building.
- **Pandas**: For handling and preprocessing data.
- **NumPy**: For efficient array manipulation.
- **Scikit-Learn**: For machine learning and model evaluation.
- **SVM**: Support Vector Machine algorithm for prediction.
- **Pickle**: For saving and loading the trained model.

## Usage

1. **Run the Jupyter Notebook**:
    - Open the **`diabetes_prediction_model.ipynb`** notebook.
    - Follow the steps within the notebook to load the dataset, train the SVM model, and evaluate its performance.
    
2. **Making Predictions**:
    - Input a new data instance in the notebook to predict whether the person is diabetic or not.
    - The prediction is made using the trained model, which can be loaded from the `diabetes_model.sav` file.

3. **Model Persistence**:
    - The trained model is saved using **pickle**. You can load it anytime for future predictions:
      ```python
      import pickle
      model = pickle.load(open('diabetes_model.sav', 'rb'))
      ```

## Model Overview

- **Dataset**: The **PIMA Indians Diabetes Dataset** contains medical parameters used to predict diabetes.
- **Model**: A **Support Vector Machine (SVM)** classifier predicts whether a person is diabetic (1) or not (0).
- **Performance**: The model achieves **77.27% test accuracy** and **78.66% training accuracy**.

## Contributing

Feel free to fork the repository, open issues, or submit pull requests. Contributions are welcome!

---
