// Universelle Collapsible-Lösung für alle Unterseiten
document.addEventListener('DOMContentLoaded', function() {
    console.log('Universelles Collapsible-Script geladen');
    
    // Funktion für Checklisten-Header
    function initChecklistCollapsibles() {
        var headers = document.querySelectorAll('.checklist-header');
        console.log('Checklist-Header gefunden:', headers.length);
        
        for (var i = 0; i < headers.length; i++) {
            // Entferne vorhandene onclick-Handler
            headers[i].removeAttribute('onclick');
            
            // Füge neuen Eventlistener hinzu
            headers[i].addEventListener('click', function() {
                console.log('Checklist-Header geklickt');
                var content = this.nextElementSibling;
                var icon = this.querySelector('.toggle-icon');
                
                // Toggle der active-Klasse
                if (content.classList.contains('active')) {
                    content.classList.remove('active');
                    content.style.maxHeight = null;
                    if (icon) icon.textContent = '▼';
                } else {
                    content.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                    if (icon) icon.textContent = '▲';
                }
            });
        }
    }
    
    // Funktion für Lösungsknöpfe
    function initSolutionButtons() {
        var buttons = document.querySelectorAll('.solution-btn');
        console.log('Solution-Buttons gefunden:', buttons.length);
        
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                var solutionId = this.getAttribute('onclick').replace("toggleSolution('", "").replace("')", "");
                var solution = document.getElementById(solutionId);
                
                if (solution.style.display === 'block') {
                    solution.style.display = 'none';
                    this.textContent = 'Lösung anzeigen';
                } else {
                    solution.style.display = 'block';
                    this.textContent = 'Lösung ausblenden';
                }
            });
        }
    }
    
    // Initialisiere alle Funktionalitäten
    initChecklistCollapsibles();
    initSolutionButtons();
    
    // Öffne das erste Collapsible
    var firstHeader = document.querySelector('.checklist-header');
    if (firstHeader) {
        setTimeout(function() {
            firstHeader.click();
        }, 500);
    }
    
    console.log('Collapsible-Initialisierung abgeschlossen');
});