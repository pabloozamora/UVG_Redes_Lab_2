import random
import string

def generate_random_string(len):
    letras = string.ascii_letters + string.digits
    return ''.join(random.choice(letras) for _ in range(len))