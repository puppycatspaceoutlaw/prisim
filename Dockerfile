# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /images

# Copy the current directory contents into the container at /images
COPY optimize_images.py /usr/local/bin/optimize_images.py

# Install Pillow library
RUN pip install Pillow

# Make the script executable
RUN chmod +x /usr/local/bin/optimize_images.py

# Run the script when the container launches
ENTRYPOINT ["python", "/usr/local/bin/optimize_images.py"]
