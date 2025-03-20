from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/python-model-info/")
def get_model_info():
    return {
        "model_name": "Sample 3D Model",
        "vertex_count": 5000,
        "texture": "capsule0.jpg"
    }

