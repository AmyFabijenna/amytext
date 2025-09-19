// Funktion zum Ein- und Ausklappen der Collapsibles
function setupCollapsibles() {
  // Warten, bis das DOM vollständig geladen ist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollapsibles);
  } else {
    initCollapsibles();
  }
  
  function initCollapsibles() {
    // Alle Collapsible-Buttons finden
    const collapsibles = document.querySelectorAll('.collapsible');
    
    // Event-Listener für jedes Collapsible hinzufügen
    collapsibles.forEach(coll => {
      // Sicherstellen, dass nicht bereits ein Listener vorhanden ist
      coll.onclick = null;
      coll.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content.style.display === 'block') {
          content.style.display = 'none';
        } else {
          content.style.display = 'block';
        }
      });
    });
    
    // Eventuell standardmäßig erste Collapsibles öffnen
    const firstCollapsibles = document.querySelectorAll('.collapsible:first-child');
    firstCollapsibles.forEach(coll => {
      coll.classList.add('active');
      const content = coll.nextElementSibling;
      content.style.display = 'block';
    });
  }
}

// Funktion aufrufen
setupCollapsibles();