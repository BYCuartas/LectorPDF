from flask import Flask, request, jsonify
import os
import pytesseract
from pdf2image import convert_from_bytes
from PIL import Image
from flask_cors import CORS
import requests
import cv2
import numpy as np
import nlpcloud

# Configuración de Flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

# Configuración de NLP Cloud
import nlpcloud

# Configuración del cliente de NLP Cloud
client = nlpcloud.Client(
    "llama-3-1-405b",
    "API_KEY_ACA",
    gpu=True,
    lang="spa_Latn"
)

#NLP_CLOUD_API_KEY = os.getenv("API_KEY_ACA")
#NLP_CLOUD_URL = "https://api.nlpcloud.io/v1/gpu/spa_Latn/llama-3-1-405b/gs-correction"


# Configurar rutas de ejecutables
pytesseract.pytesseract.tesseract_cmd = r"C:\\Program Files\\Tesseract-OCR\\tesseract.exe"
poppler_path = r"C:\\Users\\brahyan.yepes\\Documents\\poppler-24.08.0\\Library\\bin"

def preprocess_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    kernel = np.array([[0, -1, 0], [-1, 5,-1], [0, -1, 0]])
    sharpened = cv2.filter2D(thresh, -1, kernel)
    return sharpened

def extract_text_from_image(image):
    processed_image = preprocess_image(image)
    text = pytesseract.image_to_string(processed_image, lang="spa")
    return text.strip()

def correct_text_with_nlp_cloud(text):
    try:
        response = client.gs_correction(text)
        return response.get("data", text).strip()
    except Exception as e:
        print(f"Error al conectar con NLP Cloud: {str(e)}")
        return text


def identify_colombian_id_card(text):
    keywords = ["REPÚBLICA", "COLOMBIA", "IDENTIFICACIÓN", "CÉDULA", "CIUDADANÍA", "TARJETA", "IDENTIDAD"]
    matches = [word for word in keywords if word in text.upper()]
    
    if len(matches) >= 3:
        return "Datos de Cédula de ciudadanía colombiana detectada."
    return "No se detectó datos de cédula de ciudadanía colombiana."

@app.route("/extract-text", methods=["POST"])
def extract_text():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No se proporcionó ningún archivo."}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "Archivo no válido."}), 400

        extracted_text = ""
        if file.filename.lower().endswith(".pdf"):
            images = convert_from_bytes(file.read(), poppler_path=poppler_path)
            for image in images:
                extracted_text += pytesseract.image_to_string(image) + "\n"
        else:
            image = Image.open(file)
            extracted_text = pytesseract.image_to_string(image)

        print("\nTexto extraído original:")
        print(extracted_text)
        
        corrected_text = correct_text_with_nlp_cloud(extracted_text)
        print("\nTexto corregido:")
        print(corrected_text)

        id_card_info = identify_colombian_id_card(extracted_text)
        
        return jsonify({
            "text": extracted_text.strip(),
            "corrected_text": corrected_text,
            "id_card_info": id_card_info
        })

    except Exception as e:
        print(f"Error en el procesamiento: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001, host="0.0.0.0")