import os
from PIL import Image

# List of filenames to optimize
target_filenames = [
    "fotinicial.jpg",
    "fundofoo.jpg",
    "fotdireita.jpg",
    "servfundo.jpg",
    "blueeyes.png",
    "eu na mesa.png",
    "TremSend.png",
    "capaserv.png",
    # servicos.jpg was already optimized
]

MAX_WIDTH = 1920

def optimize_image(filepath):
    try:
        with Image.open(filepath) as img:
            original_size = os.path.getsize(filepath)
            
            # Check if optimization is needed (size or dimension)
            should_save = False
            
            if img.width > MAX_WIDTH:
                ratio = MAX_WIDTH / img.width
                new_height = int(img.height * ratio)
                if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                     img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
                else:
                     img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
                print(f"Resizing {filepath} to {MAX_WIDTH}x{new_height}")
                should_save = True
            
            # For this task, we want to force re-save to apply compression even if not resized
            # But only if it's one of the target huge files.
            should_save = True

            if should_save:
                ext = os.path.splitext(filepath)[1].lower()
                
                if ext in ['.jpg', '.jpeg']:
                    img.save(filepath, "JPEG", quality=80, optimize=True)
                elif ext == '.png':
                     img.save(filepath, "PNG", optimize=True)
                
                new_size = os.path.getsize(filepath)
                savings = original_size - new_size
                if savings > 0:
                    print(f"Optimized {os.path.basename(filepath)}: Saved {savings/1024/1024:.2f} MB")
                else:
                    print(f"Processed {os.path.basename(filepath)} (No size reduction)")

    except Exception as e:
        print(f"Error processing {filepath}: {e}")

if __name__ == "__main__":
    print("Starting recursive image search and optimization...")
    root_dir = "assets/img"
    
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file in target_filenames:
                full_path = os.path.join(root, file)
                print(f"Found target: {full_path}")
                optimize_image(full_path)
                
    print("Finished.")
