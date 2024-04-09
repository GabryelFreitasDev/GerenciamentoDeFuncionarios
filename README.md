Criar um arquivo .env na pasta backend e colar o seguinte codigo:

DATABASE_URL="postgresql://postgres:123@localhost:5432/gerenciamento?schema=public"

Existe um exemplo dentro do BackEnd, onde só precisa mudar o nome para '.env' e remover o # antes do código acima

COMANDOS:

npm run dev (pra rodar em ambos)

*BACKEND*

npm add express-async-errors

npm add cors

npm add @types/cors

npm add prisma

npm add @prisma/client

npx prisma init

npx prisma generate

npm add bcryptjs 

npm add @types/bcryptjs 

npx prisma migrate dev (gerar migrations)

*FRONTEND*

npm add sass

npm add react-icons

npm add axios nookies

npm add react-toastify
