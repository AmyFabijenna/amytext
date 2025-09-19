// JavaScript für die Collapsible-Funktionalität
document.addEventListener('DOMContentLoaded', function() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    // Alle Collapsibles standardmäßig schließen und Event Listener hinzufügen
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.classList.remove("active");
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add("active");
            }
        });
        
        // Standardmäßig schließen
        var content = coll[i].nextElementSibling;
        content.style.maxHeight = null;
        content.classList.remove("active");
    }
});

// Funktion zum Öffnen/Schließen aller Collapsibles
function toggleAll() {
    var coll = document.getElementsByClassName("collapsible");
    var allOpen = true;
    var i;
    
    // Prüfen, ob alle bereits geöffnet sind
    for (i = 0; i < coll.length; i++) {
        var content = coll[i].nextElementSibling;
        if (!content.style.maxHeight) {
            allOpen = false;
            break;
        }
    }
    
    // Alle öffnen oder schließen
    for (i = 0; i < coll.length; i++) {
        var content = coll[i].nextElementSibling;
        
        if (allOpen) {
            // Alle schließen
            coll[i].classList.remove("active");
            content.style.maxHeight = null;
            content.classList.remove("active");
        } else {
            // Alle öffnen
            coll[i].classList.add("active");
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add("active");
        }
    }
    
    // Text des Buttons ändern
    var btn = document.querySelector('.expand-all-btn');
    if (btn) {
        btn.textContent = allOpen ? 'Alle Bereiche aufklappen' : 'Alle Bereiche zuklappen';
    }
}

// Funktion zum Anzeigen/Verbergen von Lösungen
function toggleSolution(id) {
    var solution = document.getElementById(id);
    if (solution) {
        solution.classList.toggle("active");
        
        // Button-Text ändern
        var btn = event.target;
        if (solution.classList.contains("active")) {
            btn.textContent = 'Lösung ausblenden';
        } else {
            btn.textContent = 'Lösung anzeigen';
        }
    }
}