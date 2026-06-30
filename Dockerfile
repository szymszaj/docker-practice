# Etap 1: wybieramy bazowy image
# node:18-alpine = Node.js 18 na minimalnym Alpine Linux (~50MB zamiast ~900MB)
FROM node:18-alpine

# Etap 2: ustawiamy katalog roboczy wewnątrz kontenera
WORKDIR /app

# Etap 3: kopiujemy package.json (osobno, żeby Docker cachował zależności)
COPY package.json .

# Etap 4: instalujemy zależności (tu ich nie ma, ale to dobra praktyka)
RUN npm install --production

# Etap 5: kopiujemy resztę kodu
COPY src/ ./src/

# Etap 6: mówimy Dockerowi że kontener nasłuchuje na tym porcie
EXPOSE 3000

# Etap 7: komenda startowa — co ma się uruchomić gdy kontener startuje
CMD ["node", "src/index.js"]
