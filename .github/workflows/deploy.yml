name: NestJS CI/CD

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Dependencies
        working-directory: backend
        run: npm install

      - name: Build NestJS
        working-directory: backend
        run: npm run build

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build Docker Image
        run: docker build -t haripraksh/nest-api:latest .

      - name: Push Docker Image
        run: docker push haripraksh/nest-api:latest

      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            sudo docker pull haripraksh/nest-api:latest
            sudo docker stop nest-api || true
            sudo docker rm nest-api || true
            sudo docker run -d \
              --name nest-api \
              --restart unless-stopped \
              --env-file /home/ubuntu/.env \
              -p 3000:3000 \
              haripraksh/nest-api:latest