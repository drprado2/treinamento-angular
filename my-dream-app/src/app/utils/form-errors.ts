export const formErrors = {
  min : min => `O valor deve ser no mínimo ${min}`,
  max : max => `O valor deve ser no máximo ${max}`,
  required : () => 'O campo deve ser preenchido',
  requiredTrue : () => 'Esse campo deve ser selecionado',
  email : () => 'O campo deve ser um e-mail válido',
  minlength : result => `O campo deve ter no mínimo ${result.requiredLength} caracteres`,
  maxlength : result => `O campo deve ter no máximo ${result.requiredLength} caracteres`,
  pattern : () => 'O campo deve ter o formato válido',
  nullValidator: () => 'O campo deve ser preenchido'
}

