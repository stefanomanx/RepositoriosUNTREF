"""
Tutorial paso a paso sobre el uso de Pytest (en español).

Contenido:
- ¿Qué es Pytest?
- Instalación
- Estructura mínima de un test
- Ejecutar pytest desde consola
- Asserts, fixtures, markers, parametrización
- Comandos útiles para ejecución y reportes

Este archivo no está pensado para ejecutarse como test, sino como apuntes que
acompañan los ejercicios prácticos de la clase.
"""

 # ¿Qué es Pytest?
 # Pytest es un framework de testing para Python, ligero, extensible y sencillo.

 # Instalación:
 # Abrir una terminal y ejecutar:
 # pip install pytest

 # Estructura mínima de un test:
 # def test_suma():
 #     assert 2 + 2 == 4

 # Ejecutar tests:
 # pytest nombre_archivo.py    -> ejecuta todos los tests en el archivo
 # pytest -v                  -> ejecución con verbosidad
 # pytest --maxfail=1 --disable-warnings  -> parar después de 1 fallo y suprimir warnings

 # Generar reporte a archivo de texto:
 # pytest > resultado.txt

 # Generar reporte HTML (instalar plugin):
 # pip install pytest-html
 # pytest --html=report.html

 # Asserts:
 # assert "hola" in "hola mundo"
 # assert 10 > 5
 # assert lista == [1, 2, 3]
 # Mensaje personalizado:
 # assert valor == 10, "El valor esperado era 10"

 # Fixtures:
 # Son funciones que preparan el entorno de test y pueden usar yield para
 # setup/teardown.
 # Ejemplo:
 # import pytest
 # @pytest.fixture
 # def usuario():
 #     return {"email": "diego@test.com", "pass": "1234"}
 #
 # def test_login(usuario):
 #     assert usuario["email"] == "diego@test.com"

 # Markers:
 # @pytest.mark.skip -> saltear test
 # @pytest.mark.xfail -> marcar test que se espera falle (bug conocido)
 # @pytest.mark.parametrize -> parametrizar inputs para un test

 # Ejercicios recomendados (para realizar en la carpeta Pytest):
 # 1) Revisar y ejecutar `test_cart.py` que acompaña este repo.
 # 2) Crear 2 tests: uno que pase y otro que falle intencionalmente.
 # 3) Probar markers skip y xfail, y la parametrización.

 # Fin del tutorial breve.

