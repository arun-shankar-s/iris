from sklearn.datasets import load_iris 
from sklearn.model_selection import train_test_split 
from sklearn.ensemble import RandomForestClassifier 
import joblib 
# Load data 
iris = load_iris()
X = iris.data
y = iris.target
# Train model 
model = RandomForestClassifier(n_estimators=100, random_state=42) 
model.fit(X, y) 
# Save model 
joblib.dump(model, "iris_model.pkl") 
print("Model trained and saved.")