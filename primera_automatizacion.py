import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
# from selenium.webdriver.firefox.options import Options
# Si no necesito el driver, mejor borrarlo

driver1 = webdriver.Chrome()
#driver1.get("https://blazedemo.com")
driver1.get("https://validaciones.rodrigovillanueva.com.mx/index.html")

driver1.maximize_window()

# 1er caso: rellenar el formulario (Happy Path)

driver1.find_element(By.ID, "nombre").send_keys("Juan")
driver1.find_element(By.ID, "apellidos").send_keys("Perez")
driver1.find_element(By.ID, "tel").send_keys("1144445555")
driver1.find_element(By.ID, "email").send_keys("juan.perez@example.com")
driver1.find_element(By.ID, "direccion").send_keys("Avenida Siempreviva 123")

time.sleep(3)

# driver1.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
driver1.find_element(By.XPATH, "//button[@type='submit']").click()

assert driver1.find_element(By.ID, "flashMessage").text == "El formulario se ha enviado correctamente."

time.sleep(3)

driver1.save_screenshot("resultado1_driver1.png")

time.sleep(3)

# 2do caso: resetear el formulario

driver1.find_element(By.XPATH, "//button[@type='reset']").click()

time.sleep(3)

# 3er caso: dejar casilleros vacios

driver1.refresh()

time.sleep(3)

driver1.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

time.sleep(3)

driver1.save_screenshot("resultado2_driver1.png")

time.sleep(3)

# 4to caso: llenar el formulario con datos invalidos

driver2 = webdriver.Chrome()
driver2.get("https://validaciones.rodrigovillanueva.com.mx/Campos_Uno_OK.html")

driver2.find_element(By.ID, "obligatorio").send_keys("cualquier cosa")
driver2.find_element(By.ID, "minLength").send_keys("12345")
driver2.find_element(By.ID, "maxLength").send_keys("1234567890")
driver2.find_element(By.ID, "onlyNumbers").send_keys("1234")

time.sleep(3)

driver2.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

time.sleep(3)

driver2.save_screenshot("resultado3_driver2.png")

time.sleep(3)

driver2.quit()

# print()
# input("*** Apretar Enter para terminar el script ***")
# print()

driver1.quit()

#driver2 = webdriver.Firefox()
#driver2.get("https://blazedemo.com")

# driver1.quit()
# driver2.quit()

#------------------------------------------------------------------#

# Código de Marcos Miller
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from webdriver_manager.chrome import ChromeDriverManager

# service = Service(ChromeDriverManager().install())
# driver = webdriver.Chrome(service=service)

# driver.get("https://blazedemo.com")

# print("Page Title:", driver.title)

# driver.quit()

#------------------------------------------------------------------#

### Primer prueba siempre el el caso feliz, el happy path, el sunny day scenario
### luego se prueban los casos de borde, edge cases, y los casos negativos
### luego se prueban los casos de excepcion, exception cases

### En la clase, primero llenamos el formulario, probamos que todo lo requerido esté, y si el formulario se envia, esta OK.
### Luego vamos a Network y vemos si todo da 200 OK
### Y luego vamos a Elements y vemos las paginas source y cuales elementos (ID, clases, etc) nos sirven para las pruebas.