import requests

# Configuración
API_KEY = ""
MODEL = "llama-3-1-405b"  

def validar_api_key(api_key, model):
    url = f"https://api.nlpcloud.io/v1/gpu/spa_Latn/{model}/gs-correction"
    headers = {
        "Authorization": f"Token {api_key}",
        "Content-Type": "application/json"
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return True, "API Key válida y modelo disponible."
    elif response.status_code == 401:
        return False, "API Key inválida o permisos insuficientes."
    elif response.status_code == 404:
        return False, "Modelo no encontrado. Verifica el nombre del modelo."
    else:
        return False, f"Error desconocido: {response.text}"

# Validar API Key
valida, mensaje = validar_api_key(API_KEY, MODEL)
print(mensaje)
