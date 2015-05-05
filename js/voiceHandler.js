
function processLabel(label) {
    console.log('label');
    document.location.href = "https://mail.google.com/mail/u/0/#label/" + label;
}


function processSearch(term) {
    console.log('search');
    term = term.replace(/\s+/g, '+');
    document.location.href = "https://mail.google.com/mail/u/0/#search/" + term;
}

annyang = function() {
    if (annyang) {
      var commands = {
        'Gmail label *name': processLabel,
        'Gmail search *term': processSearch
      };
      annyang.addCommands(commands);
      annyang.start();
      annyang.debug();
    }
}

window.onload = annyang;