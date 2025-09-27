"""
Ejercicios prácticos para la clase de Pytest.

Contiene:
- test que pasa
- test que falla intencionalmente
- test con @pytest.mark.skip
- test con @pytest.mark.xfail (bug conocido)
- test parametrizado

Pegar este archivo en la carpeta `Pytest` y ejecutarlo con pytest.
"""
import pytest

from .cart import Cart


def test_ejemplo_pasa():
    """Test sencillo que debe pasar."""
    c = Cart()
    c.add_item("goma", 1.5, 2)
    assert c.total() == 3.0, "Total incorrecto: debería ser 3.0"


def test_ejemplo_falla(carrito):
    """Test que espera que agregar un precio negativo lance ValueError."""
    with pytest.raises(ValueError):
        carrito.add_item("error", -2.0, 1)


@pytest.mark.skip(reason="Ejemplo de skip: este test está en desarrollo")
def test_ejemplo_skip():
    c = Cart()
    c.add_item("x", 1, 1)
    assert c.total() == 1


def test_ejemplo_error_valor(carrito):
    with pytest.raises(ValueError):
        carrito.add_item("bad", -10, 1)


@pytest.mark.parametrize("price,qty,expected", [
    (1.0, 1, 1.0),
    (2.0, 2, 4.0),
    (0.5, 4, 2.0),
])
def test_ejemplo_param(price, qty, expected):
    c = Cart()
    c.add_item("p", price, qty)
    assert c.total() == expected
