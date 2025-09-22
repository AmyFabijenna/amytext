function toggleAccordion(element) {
    if (!element) return;
    
    var panel = element.nextElementSibling || element.nextSibling;
    while (panel && panel.nodeType !== 1) {
        panel = panel.nextSibling;
    }
    
    if (!panel) return;
    
    if (element.className.indexOf('active') > -1) {
        element.className = element.className.replace(' active', '').replace('active', '');
    } else {
        element.className += ' active';
    }
    
    if (panel.className.indexOf('active') > -1) {
        panel.className = panel.className.replace(' active', '').replace('active', '');
    } else {
        panel.className += ' active';
    }
}

function toggleSolution(elementId) {
    var element = document.getElementById(elementId);
    if (!element) return;
    
    if (element.style.display === 'block') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
}

function toggleAll() {
    var accordions = document.getElementsByClassName('accordion-header');
    var panels = document.getElementsByClassName('panel');
    
    if (!accordions || !panels) return;
    
    var allOpen = true;
    for (var i = 0; i < panels.length; i++) {
        if (panels[i].className.indexOf('active') === -1) {
            allOpen = false;
            break;
        }
    }
    
    for (var i = 0; i < accordions.length; i++) {
        if (allOpen) {
            accordions[i].className = accordions[i].className.replace(' active', '').replace('active', '');
        } else {
            if (accordions[i].className.indexOf('active') === -1) {
                accordions[i].className += ' active';
            }
        }
    }
    
    for (var i = 0; i < panels.length; i++) {
        if (allOpen) {
            panels[i].className = panels[i].className.replace(' active', '').replace('active', '');
        } else {
            if (panels[i].className.indexOf('active') === -1) {
                panels[i].className += ' active';
            }
        }
    }
}

function toggleAllSolutions() {
    var solutions = document.getElementsByClassName('solution-content');
    if (!solutions) return;
    
    var allOpen = true;
    for (var i = 0; i < solutions.length; i++) {
        if (solutions[i].style.display !== 'block') {
            allOpen = false;
            break;
        }
    }
    
    for (var i = 0; i < solutions.length; i++) {
        if (allOpen) {
            solutions[i].style.display = 'none';
        } else {
            solutions[i].style.display = 'block';
        }
    }
}

function toggleChecklist(element) {
    if (!element) return;
    
    var content = element.nextElementSibling || element.nextSibling;
    while (content && content.nodeType !== 1) {
        content = content.nextSibling;
    }
    
    if (!content) return;
    
    if (element.className.indexOf('active') > -1) {
        element.className = element.className.replace(' active', '').replace('active', '');
    } else {
        element.className += ' active';
    }
    
    if (content.className.indexOf('active') > -1) {
        content.className = content.className.replace(' active', '').replace('active', '');
    } else {
        content.className += ' active';
    }
}