FROM public.ecr.aws/ubuntu/ubuntu:22.04_stable

RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . . 
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


