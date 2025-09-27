# Cheatsheet Pytest (PowerShell)

Comandos básicos:

- Ejecutar todos los tests:
```
pytest
```
- Ejecutar un archivo:
```
pytest Pytest/test_cart.py
```
- Verbosidad:
```
pytest -v
```
- Ejecutar por palabra clave:
```
pytest -k nombre_parcial
```
- Filtrar por marker:
```
pytest -m marker_name
```
- Parar después del primer fallo:
```
pytest --maxfail=1
```

Generar reportes:

- Guardar salida en texto:
```
pytest > resultado.txt
```
- Generar HTML (pytest-html):
```
pytest --html=report.html
```

Tips rápidos:
- Usa fixtures en `conftest.py` para compartir setup entre tests.
- Usa `with pytest.raises(...)` para comprobar excepciones.
- Para comparaciones de floats, usa `pytest.approx()`.
