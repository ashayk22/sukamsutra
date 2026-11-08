import os
import re
import urllib.request
from pathlib import Path
import subprocess

def check_images():
    brand_file = Path('src/data/brandData.js')
    content = brand_file.read_text(encoding='utf-8')
    # find all /images/... strings
    imgs = set(re.findall(r'(/images/[^"\']+)', content))
    print(f"Total image references found: {len(imgs)}")
    missing = []
    for img in sorted(imgs):
        local_file = Path('public') / img.lstrip('/')
        if not local_file.exists():
            missing.append(img)
            print(f"  [MISSING]: {img}")
        else:
            size_kb = local_file.stat().st_size / 1024
            print(f"  [OK] {img} ({size_kb:.1f} KB)")
    
    if not missing:
        print("ALL referenced images exist and have valid sizes!")
    return len(missing) == 0

def capture_screenshots():
    chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
    base_url = 'http://localhost:5173/?static=true'
    
    # 1. Desktop Above-the-fold 1440x900
    p1 = os.path.abspath('desktop_hero_1440.png')
    subprocess.run([
        chrome_path, '--headless', f'--screenshot={p1}',
        '--window-size=1440,900', '--hide-scrollbars', base_url
    ])
    print(f"Captured {p1}: {os.path.exists(p1)}")

    # 2. Desktop Full Page (1440 x 5200)
    p2 = os.path.abspath('desktop_full_page.png')
    subprocess.run([
        chrome_path, '--headless', f'--screenshot={p2}',
        '--window-size=1440,5400', '--hide-scrollbars', base_url
    ])
    print(f"Captured {p2}: {os.path.exists(p2)}")

    # 3. Mobile Viewport 390x844
    p3 = os.path.abspath('mobile_hero_390.png')
    subprocess.run([
        chrome_path, '--headless', f'--screenshot={p3}',
        '--window-size=390,844', '--hide-scrollbars', base_url
    ])
    print(f"Captured {p3}: {os.path.exists(p3)}")

    # 4. Mobile Full Page (390 x 8000)
    p4 = os.path.abspath('mobile_full_page.png')
    subprocess.run([
        chrome_path, '--headless', f'--screenshot={p4}',
        '--window-size=390,8000', '--hide-scrollbars', base_url
    ])
    print(f"Captured {p4}: {os.path.exists(p4)}")

if __name__ == '__main__':
    all_ok = check_images()
    capture_screenshots()

