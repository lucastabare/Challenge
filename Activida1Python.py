def esta_balanceada(cadena):
    aperturas = {'(': ')', '{': '}', '[': ']'}
    cadena = []

    for char in cadena:
        if char in aperturas:  
            cadena.append(char)
        elif char in aperturas.values(): 
            if not cadena or aperturas[cadena.pop()] != char:
                return False

    return not cadena