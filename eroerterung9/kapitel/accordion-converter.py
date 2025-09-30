# -*- coding: utf-8 -*-
import re
import os
import shutil

def create_correct_accordion_structure(input_file, output_file=None):
    """
    Erstellt die korrekte Accordion-Struktur für die Textanalyse-Techniken
    """
    if output_file is None:
        output_file = input_file
    
    # Sicherungskopie erstellen
    backup_file = input_file.replace('.html', '_backup.html')
    shutil.copy2(input_file, backup_file)
    print(f"✅ Sicherungskopie erstellt: {backup_file}")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Hauptabschnitte (7.1, 7.2, 7.3, etc.) als Accordions
    content = re.sub(
        r'<div class="section-card">\s*<div class="section-header">\s*(\d+\.\d+ [^<]+)\s*<span class="toggle-arrow">▼</span>\s*</div>\s*<div class="section-content">\s*<h2>([^<]+)</h2>',
        r'<div class="section-card">\n    <div class="section-header" onclick="toggleSection(this)">\n        \1: \2\n        <span class="toggle-arrow">▼</span>\n    </div>\n    <div class="section-content">',
        content
    )
    
    # 2. Unterabschnitte (7.1.1, 7.1.2, etc.) als Accordions
    content = re.sub(
        r'<div class="section-card">\s*<div class="section-header">\s*(\d+\.\d+\.\d+ [^<]+)\s*<span class="toggle-arrow">▼</span>\s*</div>\s*<div class="section-content">\s*<h3>([^<]*)</h3>',
        r'<div class="section-card">\n    <div class="section-header" onclick="toggleSection(this)">\n        \1: \2\n        <span class="toggle-arrow">▼</span>\n    </div>\n    <div class="section-content">',
        content
    )
    
    # 3. Übungen und Musterlösungen als spezielle Accordions
    # Übungen
    content = re.sub(
        r'<div class="section-card">\s*<div class="section-header">\s*(\d+\.\d+\.\d+ ÜBUNG[^<]*)\s*<span class="toggle-arrow">▼</span>\s*</div>',
        r'<div class="section-card exercise-card">\n    <div class="section-header" onclick="toggleSection(this)">\n        🎯 \1\n        <span class="toggle-arrow">▼</span>\n    </div>',
        content
    )
    
    # Musterlösungen
    content = re.sub(
        r'<div class="section-card">\s*<div class="section-header">\s*(MUSTERLÖSUNG[^<]*)\s*<span class="toggle-arrow">▼</span>\s*</div>',
        r'<div class="section-card solution-card">\n    <div class="section-header" onclick="toggleSection(this)">\n        📋 \1\n        <span class="toggle-arrow">▼</span>\n    </div>',
        content
    )
    
    # 4. "Lösung anzeigen" Buttons korrekt behandeln
    content = re.sub(
        r'<p><b>📋 MUSTERLÖSUNG ANZEIGEN</b></p>',
        r'<div class="solution-toggle" onclick="toggleSolution(this)">\n    <button class="solution-btn">📋 Musterlösung anzeigen</button>\n</div>',
        content
    )
    
    # 5. Sicherstellen, dass alle section-content divs korrekt geschlossen werden
    content = re.sub(
        r'</div>\s*</div>\s*<div class="section-card">',
        r'</div>\n</div>\n\n<div class="section-card">',
        content
    )
    
    # 6. Doppelte schließende divs entfernen
    content = re.sub(r'</div>\s*</div>\s*</div>\s*</div>', r'</div>\n</div>\n</div>', content)
    
    # 7. Am Ende alle offenen divs schließen
    if content.count('<div class="section-card">') > content.count('</div></div></div>'):
        content += '\n</div>\n</div>\n</div>'
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Erfolg! {input_file} wurde korrekt konvertiert -> {output_file}")

def fix_all_html_files():
    """
    Korrigiert alle HTML-Dateien im kapitel/ Verzeichnis
    """
    kapitel_dir = "kapitel"
    
    if not os.path.exists(kapitel_dir):
        print(f"⚠️  Verzeichnis {kapitel_dir} existiert nicht")
        return
    
    html_files = [
        "teil1-grundlagen.html",
        "teil2-texte-verstehen.html", 
        "teil3-schreibprozess.html",
        "teil4-sprache-stil.html",
        "teil5-praxis.html",
        "teil6-argumentieren.html",
        "teil7-textanalyse-techniken.html",
        "teil8-strukturierung.html",
        "teil9-formulierungshilfen.html",
        "teil10-komplett-beispiel.html",
        "teil11-uebungstexte.html",
        "teil12-checklisten.html",
        "teil13-haeufige-fehler.html",
        "teil14-abschluss.html"
    ]
    
    for html_file in html_files:
        file_path = os.path.join(kapitel_dir, html_file)
        if os.path.exists(file_path):
            print(f"\n🔄 Bearbeite: {html_file}")
            create_correct_accordion_structure(file_path)
        else:
            print(f"⚠️  {file_path} existiert nicht")

def add_css_to_index():
    """
    Fügt die notwendigen CSS-Stile zur index.html hinzu
    """
    index_file = "index.html"
    
    if not os.path.exists(index_file):
        print(f"⚠️  {index_file} existiert nicht")
        return
    
    with open(index_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # CSS für Übungen und Lösungen hinzufügen
    additional_css = """
        /* Stile für Übungen und Lösungen */
        .exercise-card {
            border-left: 5px solid #4caf50;
            background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
        }
        
        .exercise-card .section-header {
            background: linear-gradient(135deg, #4caf50, #66bb6a);
            color: white;
        }
        
        .solution-card {
            border-left: 5px solid #2196f3;
            background: linear-gradient(135deg, #e3f2fd, #bbdefb);
        }
        
        .solution-card .section-header {
            background: linear-gradient(135deg, #2196f3, #42a5f5);
            color: white;
        }
        
        .solution-toggle {
            text-align: center;
            margin: 20px 0;
        }
        
        .solution-btn {
            background: linear-gradient(135deg, #ff9800, #ffb74d);
            color: #212121;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
        }
        
        .solution-btn:hover {
            background: linear-gradient(135deg, #ffb74d, #ffcc80);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);
        }
        
        .hidden-solution {
            display: none;
        }
        
        .visible-solution {
            display: block;
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    """
    
    # CSS in den style-Bereich einfügen
    if additional_css not in content:
        # Finde das Ende des style-Blocks
        style_end_pattern = r'(\s*)(</style>)'
        replacement = r'\1' + additional_css + r'\1\2'
        content = re.sub(style_end_pattern, replacement, content)
        
        with open(index_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ CSS-Stile zu {index_file} hinzugefügt")

def add_js_functions():
    """
    Fügt die notwendigen JavaScript-Funktionen zur index.html hinzu
    """
    index_file = "index.html"
    
    if not os.path.exists(index_file):
        print(f"⚠️  {index_file} existiert nicht")
        return
    
    with open(index_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # JavaScript-Funktionen für Lösungen
    additional_js = """
        // === SOLUTION TOGGLE FUNCTION ===
        function toggleSolution(button) {
            const solutionCard = button.closest('.section-card').nextElementSibling;
            if (solutionCard && solutionCard.classList.contains('solution-card')) {
                const content = solutionCard.querySelector('.section-content');
                if (content) {
                    if (content.classList.contains('active')) {
                        content.classList.remove('active');
                        solutionCard.querySelector('.section-header').classList.remove('active');
                        button.querySelector('button').textContent = '📋 Musterlösung anzeigen';
                    } else {
                        content.classList.add('active');
                        solutionCard.querySelector('.section-header').classList.add('active');
                        button.querySelector('button').textContent = '📋 Musterlösung ausblenden';
                    }
                }
            }
        }
        
        // === ENHANCED TOGGLE FUNCTION ===
        function toggleSection(header) {
            const content = header.nextElementSibling;
            const arrow = header.querySelector('.toggle-arrow');
            
            if (content && content.classList.contains('section-content')) {
                if (content.classList.contains('active')) {
                    content.classList.remove('active');
                    header.classList.remove('active');
                    if (arrow) arrow.textContent = '▼';
                } else {
                    content.classList.add('active');
                    header.classList.add('active');
                    if (arrow) arrow.textContent = '▲';
                }
            }
        }
    """
    
    # JavaScript in den script-Bereich einfügen
    if 'function toggleSolution' not in content:
        # Finde das Ende des script-Blocks vor den Event Listeners
        script_pattern = r'(<script>\s*// === TOGGLE SIDEBAR ===)'
        replacement = additional_js + r'\n        \1'
        content = re.sub(script_pattern, replacement, content)
        
        with open(index_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ JavaScript-Funktionen zu {index_file} hinzugefügt")

def main():
    """
    Hauptfunktion - führt alle Korrekturen durch
    """
    print("🚀 Starte Korrektur der HTML-Struktur...")
    
    # 1. CSS aktualisieren
    add_css_to_index()
    
    # 2. JavaScript aktualisieren
    add_js_functions()
    
    # 3. Alle HTML-Dateien korrigieren
    fix_all_html_files()
    
    print("\n🎉 Alle Korrekturen abgeschlossen!")
    print("Die Accordion-Struktur sollte jetzt korrekt funktionieren.")

if __name__ == "__main__":
    main()