function processCmd(command) {
        command=command.toLowerCase();
    if (command.indexOf('next') > -1) {
        console.log('next');
        $("div[aria-label='Older']").click();
    }

    else if (command.indexOf('previous') > -1) {
        console.log('previous');
        $("div[aria-label='Newer']").click();
    }

    else if (command.indexOf('reply') > -1) {
        console.log('reply');
        $("div[aria-label='Reply']").click();
    }

    else if (command.indexOf('delete') > -1) {
        console.log('delete');
        $("div[aria-label='Delete']").click();
    }

    else if (command.indexOf('sent') > -1) {
        console.log('sent');
        $('a[href="https://mail.google.com/mail/u/0/#sent"]')[0].click();
    }

    else if (command.indexOf('important') > -1) {
        console.log('important');
        $('a[href="https://mail.google.com/mail/u/0/#imp"]')[0].click();
    }

    else if (command.indexOf('compose') > -1) {
        console.log('compose');
        document.location.href += "?compose=new";
    }

    else if (command.indexOf('inbox') > -1) {
        console.log('inbox');
        $('a[href="https://mail.google.com/mail/u/0/#inbox"]')[0].click();
    }

    else if (command.indexOf('trash') > -1) {
        console.log('trash');
        $('a[href="https://mail.google.com/mail/u/0/#trash"]')[0].click();
    }
    else if ((command.indexOf('drafts') > -1) || (command.indexOf('draft') > -1)) {
        console.log('drafts');
        $('a[href="https://mail.google.com/mail/u/0/#drafts"]')[0].click();
    }

    else if (command.indexOf('unread') > -1) {
        console.log('unread');
        document.location.href = "https://mail.google.com/mail/u/0/#search/label%3Aunread";
 }

    else if (command.indexOf('read') > -1) {
        console.log('read');
        document.location.href = "https://mail.google.com/mail/u/0/#search/label%3Aread";
    }

    else if (command.indexOf('chat') > -1) {
        console.log('chats');
        document.location.href = "https://mail.google.com/mail/u/0/#chats";
    }

    else if (command.indexOf('drafts') > -1) {
        console.log('drafts');
        document.location.href = "https://mail.google.com/mail/u/0/#drafts";
    }

    else if (command.indexOf('spam') > -1) {
        console.log('spam');
        document.location.href = "https://mail.google.com/mail/u/0/#spam";
    }

    else if (command.indexOf('starred') > -1) {
        console.log('starred');
        document.location.href = "https://mail.google.com/mail/u/0/#starred";
    }

    else if (command.indexOf('attachments') > -1) {
        console.log('attachments');
        document.location.href = "https://mail.google.com/mail/u/0/#search/has%3Aattachment";
    }
}


function processLabel(label) {
    console.log('label');
    document.location.href = "https://mail.google.com/mail/u/0/#label/" + label;
}


function processSearch(term) {
    console.log('search');
    term = term.replace(/\s+/g, '+');
    document.location.href = "https://mail.google.com/mail/u/0/#search/" + term;
}
function startHello(){

	console.log('Hello in console');
	window.alert("Now Listening starts");
}

function emailByName(name,time)
    {
    var myArray = new Array();
    name=name.toLowerCase();

    myArray["papa"]="singhkuldeep770@gmail.com";
        if(name=="papa")
        {
        name=myArray["papa"];
        }

    console.log('In Email '+name);
    console.log('In Email');
    name = name.replace(/\s+/g, '+');
    time=time.replace(" days", "d");
    time=time.replace(" hours","h");
    console.log('In Email'+time);
    document.location.href = "https://mail.google.com/mail/u/0/#search/from:" + name+" AND newer_than:"+ time ;
    }

function emailByNameOr(name,time)
    {
    var myArray = new Array();
    name=name.toLowerCase();

    myArray["papa"]="singhkuldeep770@gmail.com";

    Arrays.asList(myArray).contains(yourValue)
    if(Arrays.asList(myArray).contains(name))
    {
    name=myArray[name];
    }

    console.log('In Email '+name);
    name = name.replace(/\s+/g, '+');
    time=time.replace(" days", "d");
    time=time.replace(" hours","h");
    console.log('In Email'+time);

    document.location.href = "https://mail.google.com/mail/u/0/#search/from:" + name+" OR newer_than:"+ time ;
    }
annyang = function() {
    if (annyang) {
      var commands = {
	'hello': startHello,
	'Gmail get mail from *name and in *time':emailByName,
	'Gmail get mail from *name or in *time':emailByNameOr,
	'Gmail open *cmd':processCmd,
        'Gmail label *name': processLabel,
        'Gmail search *term': processSearch
      };
      annyang.addCommands(commands);
      annyang.start();
      annyang.debug();
    }
}

window.onload = annyang;
