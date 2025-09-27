"""
Pruebas con pytest para el módulo cart.

Incluye ejemplos de:
- asserts con mensajes personalizados
- fixtures con yield (setup/teardown)
- parametrización
- markers: skip, xfail
- agrupación por clase

Cada test está comentado explicando su propósito y el resultado esperado.
"""
import pytest

# Importación relativa dentro del paquete `Pytest` para que pytest la resuelva
from .cart import Cart


# La fixture `carrito` ahora se define en `conftest.py` (compartida entre tests)


def test_total_inicial_es_cero(carrito):
    """Test que espera que el total de un carrito nuevo sea 0.

    Este test debe pasar.
    """
    assert carrito.total() == 0, f"El total inicial esperado es 0, se obtuvo {carrito.total()}"


def test_agregar_item_incrementa_total(carrito):
    """Test que agrega un item válido y verifica el total.

    Agregamos un item con precio >0 y cantidad >0 y comprobamos el total.
    """
    carrito.add_item("manzana", 10.0, 2)
    assert carrito.total() == 20.0, "Total incorrecto después de agregar 2 manzanas a $10"


@pytest.mark.parametrize("price,quantity,expected", [
    (5.0, 1, 5.0),
    (3.0, 4, 12.0),
    (2.5, 2, 5.0),
])
def test_parametrizado_total(price, quantity, expected, carrito):
    """Test parametrizado que valida combinaciones de precio y cantidad."""
    carrito.add_item("producto", price, quantity)
    assert carrito.total() == expected, f"Se esperaba {expected} pero se obtuvo {carrito.total()}"


@pytest.mark.skip(reason="Ejemplo: test no listo para ejecutarse")
def test_salto_ejemplo(carrito):
    """Este test se salta y no se ejecuta. Útil para casos en desarrollo."""
    carrito.add_item("error", -1, 1)
    assert carrito.total() < 0


def test_precio_negativo_lanza_error(carrito):
    """Al intentar agregar un item con precio negativo se debe lanzar ValueError."""
    with pytest.raises(ValueError):
        carrito.add_item("producto_malo", -10.0, 1)


class TestAgrupacionCarrito:
    """Ejemplo de agrupación de tests por clase.

    Los métodos deben comenzar con 'test_' para que pytest los descubra.
    """

    def test_agregar_varios_items(self, carrito):
        carrito.add_item("a", 1, 1)
        carrito.add_item("b", 2, 2)
        assert carrito.total() == 5, "Suma incorrecta para varios items"

    def test_quitar_y_total(self, carrito):
        # Aquí aprovechamos la fixture para empezar limpio otra vez
        carrito.add_item("x", 4, 1)
        carrito.add_item("y", 6, 1)
        # no hay método remove implementado, esto muestra límites del API
        assert carrito.total() == 10
