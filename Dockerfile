FROM node:lts-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PORT=3000
ENV PORT=${PORT}

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the application files to the container
COPY ./dist ./dist

# Expose the port specified in the environment variable
EXPOSE ${PORT}

# Start the application
CMD ["npm", "start"]