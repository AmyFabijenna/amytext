// fix-collapsibles.js - Optimierte Version für Ihre Struktur
document.addEventListener('DOMContentLoaded', function() {
    // Deaktiviere die vorhandene toggleChecklist-Funktion
    const headers = document.querySelectorAll('.checklist-header');
    
    headers.forEach(header => {
        // Entferne das onclick-Attribut
        header.removeAttribute('onclick');
        
        // Füge neuen Event-Listener hinzu
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.toggle-icon');
            
            // Umschalten des Inhalts
            if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                content.style.maxHeight = null;
                if (icon) icon.textContent = '▼';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.textContent = '▲';
            }
            
            // Umschalten der active-Klasse
            this.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
    
    console.log('Collapsible-Script erfolgreich geladen und angepasst');
});