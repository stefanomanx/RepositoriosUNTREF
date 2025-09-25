# CLASE 16 - VENTANAS, ALERTAS Y FRAMES - 23/09
import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select

driver = webdriver.Chrome()

try:
	# ------------------------------------------------------------------
	# EJEMPLO 1: Ventanas y pestañas
	# ------------------------------------------------------------------
	# 1) Abrir una página y guardar el "window handle" de la ventana principal
	driver.get('https://www.wikipedia.org/')
	print("[VENTANAS] Página principal:", driver.current_url)
	ventana_principal = driver.current_window_handle  # identificador de la ventana actual

	# 2) Abrir una nueva pestaña/ventana mediante JavaScript (se crea una nueva entrada en driver.window_handles)
	driver.execute_script("window.open('https://example.com', '_blank');")
	time.sleep(1)

	# 3) Obtener todos los manejadores de ventana y cambiar el foco a la ventana secundaria
	ventanas = driver.window_handles
	print("[VENTANAS] Handles totales:", ventanas)

	# Encontrar el handle que no es el principal
	ventana_secundaria = None
	for h in ventanas:
		if h != ventana_principal:
			ventana_secundaria = h
			break

	# Cambiar el foco a la ventana secundaria y navegar/consultar
	if ventana_secundaria:
		driver.switch_to.window(ventana_secundaria)
		print("[VENTANAS] Ventana secundaria - URL actual:", driver.current_url)
		# navegar a otra página en la ventana secundaria
		driver.get('https://www.python.org/')
		print("[VENTANAS] Ventana secundaria - nueva URL:", driver.current_url)
		time.sleep(2)

		# Volver a la ventana principal
		driver.switch_to.window(ventana_principal)
		print("[VENTANAS] Volvimos a la ventana principal:", driver.current_url)

		# Cerrar la ventana secundaria (cambiamos a ella, la cerramos y volvemos al principal)
		driver.switch_to.window(ventana_secundaria)
		driver.close()
		print("[VENTANAS] Ventana secundaria cerrada")

		# Asegurarnos de volver al principal
		driver.switch_to.window(ventana_principal)
		print("[VENTANAS] Foco en ventana principal:", driver.current_url)

	else:
		print("[VENTANAS] No se detectó ventana secundaria")

	time.sleep(1)

	# ------------------------------------------------------------------
	# EJEMPLO 2: Alertas, confirms y prompt (utilizando una página de prueba)
	# ------------------------------------------------------------------
	# Usamos "the-internet" que tiene botones para alert, confirm y prompt.
	driver.get('https://the-internet.herokuapp.com/javascript_alerts')
	print('\n[ALERTAS] Página de prueba de alertas:', driver.current_url)
	time.sleep(1)

	# 1) alert(): solo leer el texto y aceptar
	driver.find_element(By.XPATH, "//button[text()='Click for JS Alert']").click()
	alert = driver.switch_to.alert
	print('[ALERTAS] alert text:', alert.text)
	alert.accept()  # aceptar la alerta
	print('[ALERTAS] alert aceptada')
	time.sleep(1)

	# 2) confirm(): aceptar y luego cancelar
	driver.find_element(By.XPATH, "//button[text()='Click for JS Confirm']").click()
	confirm = driver.switch_to.alert
	print('[ALERTAS] confirm text:', confirm.text)
	confirm.dismiss()  # cancelar (dismiss)
	print('[ALERTAS] confirm cancelado (dismiss)')
	time.sleep(1)

	# 3) prompt(): enviar texto y aceptar
	driver.find_element(By.XPATH, "//button[text()='Click for JS Prompt']").click()
	prompt = driver.switch_to.alert
	print('[ALERTAS] prompt text:', prompt.text)
	prompt.send_keys('Automatización')
	prompt.accept()
	print('[ALERTAS] prompt enviado y aceptado')

	# Mostrar el resultado que la página provee luego de interactuar con las alertas
	resultado = driver.find_element(By.ID, 'result').text
	print('[ALERTAS] Resultado en la página:', resultado)

	time.sleep(2)

	# ------------------------------------------------------------------
	# EJEMPLO 3: Iframes
	# ------------------------------------------------------------------
	# Vamos a una página de W3Schools que contiene un iframe de ejemplo.
	driver.get('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_iframe')
	print('\n[IFRAMES] Página con iframe de prueba:', driver.current_url)
	time.sleep(1)

	# En la página de W3Schools, el contenido interactivo está dentro de un iframe con id 'iframeResult'
	driver.switch_to.frame('iframeResult')  # cambiar al frame que contiene el HTML de ejemplo
	print('[IFRAMES] Ahora estamos dentro de iframeResult')
	time.sleep(1)

	# Dentro de ese contenido hay otro <iframe> embebido; lo localizamos por tag y cambiamos a él
	inner_iframe = driver.find_element(By.TAG_NAME, 'iframe')
	driver.switch_to.frame(inner_iframe)
	print('[IFRAMES] Entramos al iframe interno')
	time.sleep(1)

	# Interactuar con contenido del iframe interno (por ejemplo, leer el título de la página embebida)
	try:
		titulo = driver.find_element(By.TAG_NAME, 'h1').text
		print('[IFRAMES] Título dentro del iframe interno:', titulo)
	except Exception:
		# Dependiendo del contenido embebido, puede que no exista un <h1>; esto evita que falle el demo
		print('[IFRAMES] No se encontró <h1> dentro del iframe interno (puede variar según la página embebida)')

	time.sleep(1)

	# Volver al documento principal (salir de todos los frames)
	driver.switch_to.default_content()
	print('[IFRAMES] Volvimos al contenido principal')

	time.sleep(2)

finally:
	# Siempre cerrar el navegador al final del script para liberar recursos
	print('\n[FIN] Cerrando el navegador...')
	driver.quit()

