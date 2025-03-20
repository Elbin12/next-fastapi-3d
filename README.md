# 3D Model Viewer with Next.js and FastAPI

This project displays a 3D model in a browser using **Next.js** and **Three.js**, while fetching metadata from a **FastAPI backend**.


---

## **Prerequisites**
Make sure you have the following installed:

- **Node.js** (for the frontend)
- **Python 3.x** (for the backend)
- **pip** (for managing Python dependencies)

---

## **Setup Instructions**

### **1. Clone the Repository**
```sh
git clone https://github.com/Elbin12/next-fastapi-3d.git
cd MachineTask
```

### **2. Setup and Run the FastAPI Backend**

1. Navigate to the backend folder:
```sh
cd Backend
```
2. Create a virtual environment and activate it:
 ```sh
 python -m venv env
 .\env\Scripts\activate
```
3. Install dependencies:
```sh
pip install -r requirements.txt
```
4. Run the FastAPI server:
```sh
uvicorn main:app --reload
```
The API will now be available at:
http://127.0.0.1:8000/python-model-info

### **3. Setup and Run the Next.js Frontend**

1. Navigate to the frontend folder:
```sh
cd ../NextJs-Frontend
```
2. Install dependencies:
```sh
npm install
```
3. Start the development server:
```sh
npm run dev
```
The frontend will be available at:
http://localhost:3000


