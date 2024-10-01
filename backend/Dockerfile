# Use a imagem oficial do Node.js 14 (mesma do outro projeto)
FROM node:14

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o package.json e yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instale as dependências do projeto
RUN yarn install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta 3001 (mesma do outro projeto)
EXPOSE 3001

# Comando para rodar a aplicação (ajuste conforme necessário)
CMD ["node", "src/app.js"]