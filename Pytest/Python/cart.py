"""
Módulo simple para un carrito de compras.
Contiene un bug intencional: no valida que precio y cantidad sean > 0.
Esto permite demostrar tests que fallen/xfail.
"""
from typing import List


class Item:
    def __init__(self, name: str, price: float, quantity: int = 1):
        self.name = name
        self.price = price
        self.quantity = quantity


class Cart:
    """Carrito de compras simple.

    Reglas de negocio esperadas (no aplicadas completamente para demostrar tests):
    - price > 0
    - quantity > 0

    Intencionalmente NO validamos price/cantidad dentro de add_item para
    dejar un "bug" que las pruebas detecten.
    """

    def __init__(self):
        self.items: List[Item] = []

    def add_item(self, name: str, price: float, quantity: int = 1):
        """Agrega un item al carrito.

        Valida que price > 0 y quantity > 0. Si no se cumple, lanza ValueError.
        Esto asegura que la regla de negocio (precio y cantidad positivas) se
        aplique en un único punto.
        """
        if price <= 0:
            raise ValueError("price must be > 0")
        if quantity <= 0:
            raise ValueError("quantity must be > 0")
        item = Item(name, price, quantity)
        self.items.append(item)

    def total(self) -> float:
        """Calcula el total sin impuestos."""
        return sum(i.price * i.quantity for i in self.items)

    def clear(self):
        self.items = []
