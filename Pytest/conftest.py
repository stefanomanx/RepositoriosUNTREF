import pytest
from .cart import Cart


@pytest.fixture
def carrito():
    """Fixture que crea y limpia un carrito para cada test (scope=function)."""
    c = Cart()
    yield c
    c.clear()
