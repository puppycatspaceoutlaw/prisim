import os
from PIL import Image
import sys

def optimize_image(file_path, quality=85):
    try:
        with Image.open(file_path) as img:
            img.save(file_path, optimize=True, quality=quality)
            print(f'Optimized {file_path}')
    except Exception as e:
        print(f'Error optimizing {file_path}: {e}')

def optimize_images_in_directory(directory, quality=85):
    for root, dirs, files in os.walk(directory):
        # Skip .git directory
        if '.git' in dirs:
            dirs.remove('.git')
        for file in files:
            file_path = os.path.join(root, file)
            extension = os.path.splitext(file_path)[1].lower()
            if extension in ['.jpg', '.jpeg', '.png', '.webp']:
                optimize_image(file_path, quality)

if __name__ == '__main__':
    directory = os.getcwd()  # Get the current working directory
    print(f'Optimizing images in directory: {directory}')
    optimize_images_in_directory(directory)
