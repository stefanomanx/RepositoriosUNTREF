# CLASE 15

import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.by import By

driver=webdriver.Chrome()
driver.get("https://blazedemo.com")

driver.maximize_window()

atributo=driver.find_element(By.XPATH, "//input[@type='submit']").get_attribute("value")

print(atributo)

texto=driver.find_element(By.XPATH, "//div/h2[1]").text

print(texto)

driver.quit()

driver=webdriver.Chrome()
driver.get("https://validaciones.rodrigovillanueva.com.mx/Tiempos_Ok.html")

driver.maximize_window()

time.sleep(5)

driver.find_element(By.ID, 'field1').send_keys("Juan")

time.sleep(1)

driver.find_element(By.ID, 'field2').send_keys("Perez")

time.sleep(1)

combo = Select(driver.find_element(By.ID, 'comboBox'))
combo.select_by_visible_text("Opción 1")

time.sleep(1)

check_box = driver.find_element(By.ID, 'checkbox')
check_box.click()

time.sleep(1)

driver.find_element(By.CSS_SELECTOR, ".btn.btn-primary").click()

if driver.find_element(By.ID, "flashMessage").text.lower() == "formulario enviado exitosamente":
  print("*** El formulario se ha enviado correctamente. ***")
else:
  print("*** ERROR ***")

driver.quit()
