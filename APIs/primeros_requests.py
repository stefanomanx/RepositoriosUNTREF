
import requests
import time

# Reusable constants to avoid NameError and duplication
HEADERS = {
    "x-api-key": "reqres-free-v1"
}

POST_DATA = {
    "name": "Stefano",
    "job": "QA Engineer"
}

PUT_DATA = {
    "name": "Stefano",
    "job": "Senior QA Engineer"
}

def realizar_peticion_get():
    print("=== GET: Listar usuarios ===")
    response = requests.get("https://reqres.in/api/users?page=2", headers=HEADERS)
    print("Status Code:", response.status_code)
    print("Contenido (response body):", response.json())
    print("\n------------------------------------------------\n")

def medir_tiempo_respuesta_get():
    start_time = time.time()
    response = requests.get("https://reqres.in/api/users?page=2", headers=HEADERS)
    end_time = time.time()
    tiempo_respuesta = end_time - start_time
    # Access response so it's not unused and print status
    print("Status Code (GET):", response.status_code)
    print("Tiempo de respuesta (GET):", tiempo_respuesta, "segundos")

def realizar_peticion_post():
    print("=== POST: Crear usuario ===")
    response = requests.post("https://reqres.in/api/users", json=POST_DATA, headers=HEADERS)
    print("Status Code:", response.status_code)
    print("Usuario creado (response body):", response.json())
    print("\n------------------------------------------------\n")

def medir_tiempo_respuesta_post():
    start_time = time.time()
    response = requests.post("https://reqres.in/api/users", json=POST_DATA, headers=HEADERS)
    end_time = time.time()
    tiempo_respuesta = end_time - start_time
    print("Status Code (POST):", response.status_code)
    print("Tiempo de respuesta (POST):", tiempo_respuesta, "segundos")

def realizar_peticion_put():
    print("=== PUT: Actualizar usuario ===")
    response = requests.put("https://reqres.in/api/users/2", json=PUT_DATA, headers=HEADERS)
    print("Status Code:", response.status_code)
    print("Usuario actualizado (response body):", response.json())
    print("\n------------------------------------------------\n")

def medir_tiempo_respuesta_put():
    start_time = time.time()
    response = requests.put("https://reqres.in/api/users/2", json=PUT_DATA, headers=HEADERS)
    end_time = time.time()
    tiempo_respuesta = end_time - start_time
    print("Status Code (PUT):", response.status_code)
    print("Tiempo de respuesta (PUT):", tiempo_respuesta, "segundos")

def realizar_peticion_delete():
    print("=== DELETE: Eliminar usuario ===")
    response = requests.delete("https://reqres.in/api/users/2", headers=HEADERS)
    print("Status Code:", response.status_code)
    print("Contenido (response body):", response.text)
    print("\n------------------------------------------------\n")

def medir_tiempo_respuesta_delete():
    start_time = time.time()
    response = requests.delete("https://reqres.in/api/users/2", headers=HEADERS)
    end_time = time.time()
    tiempo_respuesta = end_time - start_time
    print("Status Code (DELETE):", response.status_code)
    print("Tiempo de respuesta (DELETE):", tiempo_respuesta, "segundos")

def main():
    realizar_peticion_get()
    medir_tiempo_respuesta_get()
    time.sleep(5)  # Espera de 5 segundos entre peticiones
    realizar_peticion_post()
    medir_tiempo_respuesta_post()
    time.sleep(5)  # Espera de 5 segundos entre peticiones
    realizar_peticion_put()
    medir_tiempo_respuesta_put()
    time.sleep(5)  # Espera de 5 segundos entre peticiones
    realizar_peticion_delete()
    medir_tiempo_respuesta_delete()

if __name__ == "__main__":
    main()