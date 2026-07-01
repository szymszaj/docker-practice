# Etap 1: bazowy image
# node:18-alpine = Node.js 18 na minimalnym Alpine Linux (~50MB zamiast ~900MB)
FROM node:18-alpine

# Etap 2: katalog roboczy wewnątrz kontenera
WORKDIR /app

# Etap 3: kopiujemy TYLKO manifesty zależności (osobno od kodu).
# Dzięki temu Docker cachuje warstwę z npm — dopóki package*.json się nie zmieni,
# nie instaluje paczek od nowa przy każdej zmianie kodu.
# --chown=node:node → pliki należą do użytkownika `node`, nie root.
# (COPY zachowuje uprawnienia z dysku hosta — bez tego non-root nie odczyta plików!)
COPY --chown=node:node package*.json ./

# Etap 4: instalujemy zależności produkcyjne.
# `npm ci` (zamiast `npm install`) = instalacja dokładnie wg package-lock.json → buildy odtwarzalne.
# `--omit=dev` = pomijamy zależności deweloperskie w obrazie produkcyjnym.
RUN npm ci --omit=dev && npm cache clean --force

# Etap 5: kopiujemy resztę kodu (ta warstwa zmienia się najczęściej → jest na końcu)
COPY --chown=node:node src/ ./src/

# Etap 6: przełączamy się na wbudowanego, NIEUPRZYWILEJOWANEGO użytkownika `node`.
# Domyślnie kontener działa jako root — to zagrożenie bezpieczeństwa.
# Image node:* ma już gotowego użytkownika `node`.
USER node

# Etap 7: kontener nasłuchuje na tym porcie (dokumentacja, nie publikacja portu)
EXPOSE 3000

# Etap 8: HEALTHCHECK — Docker sam odpytuje /health i oznacza kontener jako healthy/unhealthy.
# wget jest wbudowany w Alpine (busybox). --spider = tylko sprawdź, nie pobieraj.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Etap 9: komenda startowa
CMD ["node", "src/index.js"]
