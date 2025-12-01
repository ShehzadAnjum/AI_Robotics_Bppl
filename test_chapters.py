#!/usr/bin/env python3
"""
Browser testing script for Chapters 1 and 2
Tests interactive components, Mermaid diagrams, and overall rendering
"""

from playwright.sync_api import sync_playwright
import json
from pathlib import Path

def test_chapters():
    """Test both chapters in the browser"""

    results = {
        "homepage": {},
        "chapter1": {},
        "chapter2": {},
        "summary": {}
    }

    with sync_playwright() as p:
        # Launch browser in headless mode
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()

        # Track console messages and errors
        console_messages = []
        console_errors = []

        page.on("console", lambda msg: console_messages.append({
            "type": msg.type,
            "text": msg.text
        }))

        page.on("pageerror", lambda err: console_errors.append(str(err)))

        print("🌐 Testing Docusaurus site...\n")

        # ===== TEST HOMEPAGE =====
        print("📄 Testing Homepage...")
        try:
            page.goto('http://localhost:3000/robotics_book/', timeout=30000)
            page.wait_for_load_state('networkidle', timeout=30000)

            # Take screenshot
            page.screenshot(path='/tmp/homepage.png', full_page=True)

            # Check title
            title = page.title()
            results["homepage"]["title"] = title
            results["homepage"]["success"] = "Physical AI" in title

            # Check navigation
            nav_items = page.locator('nav a').all()
            results["homepage"]["navigation_links"] = len(nav_items)

            print(f"   ✅ Homepage loaded")
            print(f"   📸 Screenshot: /tmp/homepage.png")
            print(f"   📌 Title: {title}")
            print(f"   🔗 Navigation links: {len(nav_items)}\n")

        except Exception as e:
            print(f"   ❌ Homepage failed: {e}\n")
            results["homepage"]["error"] = str(e)

        # ===== TEST CHAPTER 1 =====
        print("📚 Testing Chapter 1: Introduction to Physical AI...")
        try:
            page.goto('http://localhost:3000/robotics_book/docs/foundations/intro-physical-ai', timeout=30000)
            page.wait_for_load_state('networkidle', timeout=30000)

            # Additional wait for React components
            page.wait_for_timeout(2000)

            # Take screenshot
            page.screenshot(path='/tmp/chapter1.png', full_page=True)

            # Get page title
            title = page.title()
            results["chapter1"]["title"] = title

            # Count headings
            headings = page.locator('h1, h2, h3').all()
            results["chapter1"]["headings"] = len(headings)

            # Check for interactive components
            curiosity_hooks = page.locator('[class*="curiosity"]').count()
            results["chapter1"]["curiosity_hooks"] = curiosity_hooks

            # Check for Mermaid diagrams
            mermaid_diagrams = page.locator('.mermaid, svg[aria-roledescription="diagram"]').count()
            results["chapter1"]["mermaid_diagrams"] = mermaid_diagrams

            # Check for AI prompt cards
            prompt_cards = page.locator('[class*="prompt"], [class*="card"]').count()
            results["chapter1"]["interactive_cards"] = prompt_cards

            # Check for code blocks
            code_blocks = page.locator('pre code').count()
            results["chapter1"]["code_blocks"] = code_blocks

            # Check for external links
            external_links = page.locator('a[href^="http"]').count()
            results["chapter1"]["external_links"] = external_links

            # Get word count estimate (visible text)
            body_text = page.locator('article, main').text_content()
            word_count = len(body_text.split()) if body_text else 0
            results["chapter1"]["estimated_word_count"] = word_count

            results["chapter1"]["success"] = True

            print(f"   ✅ Chapter 1 loaded successfully")
            print(f"   📸 Screenshot: /tmp/chapter1.png")
            print(f"   📌 Title: {title}")
            print(f"   📝 Headings: {len(headings)}")
            print(f"   🎨 Interactive components detected:")
            print(f"      - Curiosity hooks: {curiosity_hooks}")
            print(f"      - Mermaid diagrams: {mermaid_diagrams}")
            print(f"      - Interactive cards: {prompt_cards}")
            print(f"      - Code blocks: {code_blocks}")
            print(f"   🔗 External links: {external_links}")
            print(f"   📊 Estimated word count: {word_count:,}\n")

        except Exception as e:
            print(f"   ❌ Chapter 1 failed: {e}\n")
            results["chapter1"]["error"] = str(e)
            results["chapter1"]["success"] = False

        # ===== TEST CHAPTER 2 =====
        print("📚 Testing Chapter 2: Electronics Basics...")
        try:
            page.goto('http://localhost:3000/robotics_book/docs/foundations/electronics-basics', timeout=30000)
            page.wait_for_load_state('networkidle', timeout=30000)

            # Additional wait for React components
            page.wait_for_timeout(2000)

            # Take screenshot
            page.screenshot(path='/tmp/chapter2.png', full_page=True)

            # Get page title
            title = page.title()
            results["chapter2"]["title"] = title

            # Count headings
            headings = page.locator('h1, h2, h3').all()
            results["chapter2"]["headings"] = len(headings)

            # Check for interactive components
            curiosity_hooks = page.locator('[class*="curiosity"]').count()
            results["chapter2"]["curiosity_hooks"] = curiosity_hooks

            # Check for Mermaid diagrams
            mermaid_diagrams = page.locator('.mermaid, svg[aria-roledescription="diagram"]').count()
            results["chapter2"]["mermaid_diagrams"] = mermaid_diagrams

            # Check for AI prompt cards
            prompt_cards = page.locator('[class*="prompt"], [class*="card"]').count()
            results["chapter2"]["interactive_cards"] = prompt_cards

            # Check for self-eval questions
            eval_questions = page.locator('details, [class*="eval"], [class*="question"]').count()
            results["chapter2"]["eval_questions"] = eval_questions

            # Check for code blocks
            code_blocks = page.locator('pre code').count()
            results["chapter2"]["code_blocks"] = code_blocks

            # Check for external links
            external_links = page.locator('a[href^="http"]').count()
            results["chapter2"]["external_links"] = external_links

            # Get word count estimate
            body_text = page.locator('article, main').text_content()
            word_count = len(body_text.split()) if body_text else 0
            results["chapter2"]["estimated_word_count"] = word_count

            results["chapter2"]["success"] = True

            print(f"   ✅ Chapter 2 loaded successfully")
            print(f"   📸 Screenshot: /tmp/chapter2.png")
            print(f"   📌 Title: {title}")
            print(f"   📝 Headings: {len(headings)}")
            print(f"   🎨 Interactive components detected:")
            print(f"      - Curiosity hooks: {curiosity_hooks}")
            print(f"      - Mermaid diagrams: {mermaid_diagrams}")
            print(f"      - Interactive cards: {prompt_cards}")
            print(f"      - Eval questions: {eval_questions}")
            print(f"      - Code blocks: {code_blocks}")
            print(f"   🔗 External links: {external_links}")
            print(f"   📊 Estimated word count: {word_count:,}\n")

        except Exception as e:
            print(f"   ❌ Chapter 2 failed: {e}\n")
            results["chapter2"]["error"] = str(e)
            results["chapter2"]["success"] = False

        # ===== CONSOLE ERROR CHECK =====
        print("🔍 Checking for console errors...")

        # Filter out non-error messages
        errors_only = [msg for msg in console_messages if msg["type"] == "error"]

        # Filter out the known PWA warning
        critical_errors = [err for err in errors_only
                          if "PwaReloadPopup" not in err["text"]]

        results["summary"]["console_errors"] = len(critical_errors)
        results["summary"]["pwa_warnings"] = len(errors_only) - len(critical_errors)
        results["summary"]["page_errors"] = len(console_errors)

        if critical_errors:
            print(f"   ⚠️  {len(critical_errors)} console errors found:")
            for err in critical_errors[:5]:  # Show first 5
                print(f"      - {err['text']}")
        else:
            print(f"   ✅ No critical console errors")

        if console_errors:
            print(f"   ⚠️  {len(console_errors)} page errors found:")
            for err in console_errors[:5]:
                print(f"      - {err}")
        else:
            print(f"   ✅ No page errors\n")

        # Save results
        results["summary"]["total_tests"] = 3
        results["summary"]["passed"] = sum([
            results["homepage"].get("success", False),
            results["chapter1"].get("success", False),
            results["chapter2"].get("success", False)
        ])

        browser.close()

    # ===== SUMMARY =====
    print("\n" + "="*60)
    print("📊 TEST SUMMARY")
    print("="*60)
    print(f"Tests Passed: {results['summary']['passed']}/{results['summary']['total_tests']}")
    print(f"Console Errors: {results['summary']['console_errors']}")
    print(f"PWA Warnings: {results['summary']['pwa_warnings']} (non-critical)")
    print(f"Page Errors: {results['summary']['page_errors']}")
    print("\n📸 Screenshots saved:")
    print("   - /tmp/homepage.png")
    print("   - /tmp/chapter1.png")
    print("   - /tmp/chapter2.png")
    print("\n📄 Full results saved to: /tmp/test_results.json")
    print("="*60 + "\n")

    # Save JSON results
    with open('/tmp/test_results.json', 'w') as f:
        json.dump(results, f, indent=2)

    return results

if __name__ == "__main__":
    test_chapters()
