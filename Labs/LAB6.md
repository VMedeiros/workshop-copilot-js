### 6️⃣ **Lab 6: Lidando com Erros de Validação** ⚠️

- **Objetivo**: Implementar validações para garantir que todos os campos obrigatórios estejam preenchidos.
- **O que você vai fazer**: Adicionar verificações no método `POST` e garantir que os livros tenham título e autor.

#### Passos:

1. No método `addBook`, adicione verificações:
   ```javascript
   if (!title || !author) return res.status(400).json({ error: 'Título e autor são obrigatórios' });
   ```
2. Teste a validação ao tentar adicionar um livro sem título ou autor.