# Todolist

Este é um projeto fullstack que usa **React** no front-end, **Node.js** com **JavaScript** no back-end, e utilizando **Firestore** como banco de dados.

## Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Links Úteis](#links-úteis)
- [Licença](#licença)

---

## Sobre o Projeto

> Este projeto tem como objetivo criar tarefas e poder visualizar as mesmas.

## Tecnologias Utilizadas

- **React** - Front-end
- **Node.js** com **JavaScript** - Back-end
- **Firestore** - Banco de dados
- **Tailwind CSS** - Estilização no front-end.

## Pré-requisitos

Para rodar o projeto localmente, você precisará ter instalado:

- **Node.js**
- **npm** ou **yarn**

## Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/matheusoda/todolist
cd todolist
```

### 2. Configurando e instalando dependências de back-end 

#### Configuração do Firestore
1. Acesse o Firebase e crie um projeto.
2. No projeto do Firebase, vá em **Configurações do Projeto** > **Contas de Serviço** e gere uma nova chave privada. 
   - O arquivo será baixado automaticamente para o seu computador.
3. Coloque o arquivo na pasta `backend/src/config/` e renomeie para `keyfile.json`.

Criar arquivo .env na pasta backend, e nela colocar as seguintes variáveis com os dados correspondentes.

```bash
GOOGLE_APPLICATION_CREDENTIALS=./config/keyfile.json
GCP_PROJECT_ID=<ID do seu projeto Firebase>
```



Acesse a pasta backend e execute o comando:
```bash
npm install
npm run start
```

### 3. Instale dependências de front-end 

acesse a pasta frontend
```bash
npm install
npm run dev
```


## Uso
Você pode acessar:

Front-end: http://localhost:5173
Back-end: http://localhost:5000


## Estrutura do projeto
```bash
todolist/
│
├── frontend/              # Código do front-end em React
│   ├── src/               # Componentes, páginas e lógica do front-end
│   └── public/            # Arquivos estáticos
│
├── backend/              # Código do back-end em Node.js
│   ├── config/           # Configuração do Firebase
│   ├── src/              # Lógica de negócios e APIs
└── README.md              # Arquivo de documentação
```

## Links Úteis
- [Documentação Firebase](https://firebase.google.com/docs)
- [Repositório GitHub](https://github.com/matheusoda/todolist)

## Licença

MIT License

Copyright (c) [2024] [Matheus Yuji Oda Kagohara]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
