# CLASE 15 - ASSERT - 18/09

import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select

driver=webdriver.Chrome()
driver.get('https://validaciones.rodrigovillanueva.com.mx/Tiempos_Ok.html')

time.sleep(5)

driver.find_element(By.ID,'field1').send_keys('Stefano')

time.sleep(5)

driver.find_element(By.ID,'field2').send_keys('Mandolesi')

time.sleep(5)

combo=Select(driver.find_element(By.ID,'comboBox'))
combo.select_by_visible_text('Opción 1')

driver.find_element(By.ID,'checkbox').click()

time.sleep(5)

driver.find_element(By.XPATH,"//button[@onclick='validateForm()']").click()
print("*** Click OK ***")

mensaje_exito=driver.find_element(By.ID,"flashMessage").text

assert 'Formulario enviado exitosamente' in mensaje_exito,'El texto no coincide con el mensaje de exito'

time.sleep(5)

driver.quit()