import random
def generate_noise(binary_message, prob):
  result = []
    
  for bit in binary_message:
      if random.random() < prob:
          # Voltear el bit
          bit = '1' if bit == '0' else '0'
      result.append(bit)
  
  return ''.join(result)