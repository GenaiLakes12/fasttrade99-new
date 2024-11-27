# Use Python 3.11 slim as the base image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies, including virtualenv, and upgrade pip
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    libpq-dev \
    libjpeg-dev \
    zlib1g-dev && \
    rm -rf /var/lib/apt/lists/*  # Clean up apt cache to reduce image size

# Upgrade pip and install virtualenv
RUN pip install --upgrade pip && pip install virtualenv

# Create and activate a virtual environment in the container
RUN python -m venv /env

# Copy the requirements.txt file to the container
COPY requirements.txt ./

# Install Python dependencies in the virtual environment
RUN /env/bin/pip install --no-cache-dir -r requirements.txt

# Copy the entire project into the container
COPY . .

# Expose the port for FastAPI (default 8000)
EXPOSE 8000

# Command to run FastAPI using Uvicorn inside the virtual environment
CMD ["/env/bin/uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

