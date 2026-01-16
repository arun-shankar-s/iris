from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS (important for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("iris_model.pkl")


def scale(value, min_ui, max_ui, min_real, max_real):
    return min_real + (value - min_ui) * (max_real - min_real) / (max_ui - min_ui)


class IrisInput(BaseModel):
    petal_length: float
    sepal_width: float
    sepal_length: float
    petal_width: float


@app.post("/predict")
def predict(data: IrisInput):
    sepal_length = scale(data.sepal_length, 0, 100, 4.3, 7.9)
    sepal_width = scale(data.sepal_width, 0, 100, 2.0, 4.4)
    petal_length = scale(data.petal_length, 0, 100, 1.0, 6.9)
    petal_width = scale(data.petal_width, 0, 100, 0.1, 2.5)

    features = np.array(
        [[sepal_length, sepal_width, petal_length, petal_width]]
    )

    pred = model.predict(features)[0]
    species = ["Setosa", "Versicolor", "Virginica"][pred]

    return {"species": species}
