// fix-collapsibles.js
document.addEventListener('DOMContentLoaded', function() {
    // Collapsible-Funktionalität
    var coll = document.getElementsByClassName("collapsible");
    
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
    
    // CSS für Collapsibles hinzufügen, falls nicht vorhanden
    if (!document.querySelector('style[data-collapsible-css]')) {
        var style = document.createElement('style');
        style.setAttribute('data-collapsible-css', 'true');
        style.textContent = `
            .collapsible {
                background-color: #34495e;
                color: white;
                cursor: pointer;
                padding: 15px;
                width: 100%;
                border: none;
                text-align: left;
                outline: none;
                font-size: 16px;
                margin: 5px 0;
                border-radius: 4px;
                transition: background-color 0.3s;
                position: relative;
            }
            
            .collapsible:after {
                content: '\\002B';
                color: white;
                font-weight: bold;
                position: absolute;
                right: 15px;
                font-size: 18px;
            }
            
            .collapsible.active:after {
                content: "\\2212";
            }
            
            .collapsible:hover {
                background-color: #2c3e50;
            }
            
            .collapsible.active {
                background-color: #2c3e50;
                border-radius: 4px 4px 0 0;
            }
            
            .collapsible-content {
                padding: 0 18px;
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease-out;
                background-color: #f9f9f9;
                border-radius: 0 0 4px 4px;
                margin-bottom: 10px;
            }
            
            .collapsible-content-inner {
                padding: 15px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Erstes Element standardmäßig öffnen
    if (coll.length > 0) {
        setTimeout(function() {
            coll[0].click();
        }, 100);
    }
});