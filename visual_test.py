#!/usr/bin/env python3
"""Simple visual screenshot tool for the chapters"""

from playwright.sync_api import sync_playwright
import sys

def capture_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        print("📸 Capturing screenshots of both chapters...\n")

        # Homepage
        print("1. Homepage...")
        page.goto('http://localhost:3000/robotics_book/')
        page.wait_for_load_state('networkidle')
        page.screenshot(path='/tmp/browser-homepage.png', full_page=True)
        print("   ✅ Saved: /tmp/browser-homepage.png\n")

        # Chapter 1
        print("2. Chapter 1: Introduction to Physical AI...")
        page.goto('http://localhost:3000/robotics_book/docs/foundations/intro-physical-ai')
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(2000)

        # Get stats
        title = page.title()
        headings = page.locator('h1, h2, h3').count()
        links = page.locator('a[href^="http"]').count()
        code_blocks = page.locator('pre code').count()

        page.screenshot(path='/tmp/browser-chapter1.png', full_page=True)

        print(f"   📌 Title: {title}")
        print(f"   📝 Headings: {headings}")
        print(f"   🔗 External links: {links}")
        print(f"   💻 Code blocks: {code_blocks}")
        print("   ✅ Saved: /tmp/browser-chapter1.png\n")

        # Chapter 2
        print("3. Chapter 2: Electronics Basics...")
        page.goto('http://localhost:3000/robotics_book/docs/foundations/electronics-basics')
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(2000)

        title = page.title()
        headings = page.locator('h1, h2, h3').count()
        links = page.locator('a[href^="http"]').count()
        code_blocks = page.locator('pre code').count()
        diagrams = page.locator('svg[aria-roledescription="diagram"]').count()

        page.screenshot(path='/tmp/browser-chapter2.png', full_page=True)

        print(f"   📌 Title: {title}")
        print(f"   📝 Headings: {headings}")
        print(f"   🔗 External links: {links}")
        print(f"   💻 Code blocks: {code_blocks}")
        print(f"   📊 Mermaid diagrams: {diagrams}")
        print("   ✅ Saved: /tmp/browser-chapter2.png\n")

        browser.close()

        print("="*60)
        print("✅ Screenshots captured successfully!")
        print("="*60)
        print("\n📂 View screenshots at:")
        print("   - file:///tmp/browser-homepage.png")
        print("   - file:///tmp/browser-chapter1.png")
        print("   - file:///tmp/browser-chapter2.png\n")

if __name__ == "__main__":
    capture_screenshots()
