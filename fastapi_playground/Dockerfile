# Use Python 3.11 image
FROM python:3.11.9-bullseye

# Set the working directory
WORKDIR /usr/fastapi_playground

# Print the current directory and Python version for debugging
RUN pwd
RUN python --version

# Copy the entire source code into the dynamically named directory
COPY . .

# Install dependencies
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Set environment variables
ENV PORT=8000

# Expose the port
EXPOSE $PORT

# Run the application
CMD ["sh", "-c", "make run PORT=$PORT"]
