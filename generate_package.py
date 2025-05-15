"""
Creates the zip file to upload on the Mozilla Add-ons site.
"""

import os
import zipfile

# Files and folders to include in the zip file
FILENAMES = ['icons', 'index.html', 'manifest.json', 'scripts.js', 'styles.css']

def __add_folder_to_zip(zipf, folder):
    for root, _, files in os.walk(folder):
        for file in files:
            filepath = os.path.join(root, file)
            arcname = os.path.relpath(filepath, start=os.path.dirname(__file__))
            zipf.write(filepath, arcname=arcname)

if __name__ == '__main__':
    with zipfile.ZipFile('ets-liens-rapides-firefox.zip', 'w') as zipf:
        for filename in FILENAMES:
            if os.path.exists(filename):
                if os.path.isdir(filename):
                    __add_folder_to_zip(zipf, filename)
                else:
                    zipf.write(filename)
            else:
                print(f"Warning: {filename} does not exist and will not be included in the zip file.")
    print("File created successfully.")
