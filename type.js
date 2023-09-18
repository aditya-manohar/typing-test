const paragraphs = [
    "An ever-growing number of complex and rigid rules plus hard-to-cope-with regulations are now being legislated from state to state. Key federal regulations were formulated by the FDA, FTC, and the CPSC. Each of these federal agencies serves a specific mission. One example: Laws sponsored by the Office of the Fair Debt Collection Practices prevent an agency from purposefully harassing clients in serious debt. The Fair Packaging and Labeling Act makes certain that protection from misleading packaging of goods is guaranteed to each buyer of goods carried in small shops as well as in large supermarkets.",
    "Two members of the 1984 class of Jefferson High School are chairing a group of 18 to look for a resort for the 20-year class reunion. A lovely place 78 miles from the city turns out to be the best. It has 254 rooms and a banquet hall to seat 378. It has been open 365 days per year since opening on May 30, 1926. They will need 450 to reserve the resort. Debbie Holmes was put in charge of buying 2,847 office machines for the entire firm. Debbie visited more than 109 companies in 35 states in 6 months. .",
    "Two common terms used to describe a salesperson are Farmer and Hunter. The reality is that most professional salespeople have a little of both. A hunter is often associated with aggressive personalities who use aggressive sales technique. In terms of sales methodology, a hunter refers to a person whose focus is on bringing in and closing deals. This process is called sales capturing. An example is a commodity sale such as a long distance salesperson, shoe salesperson and to a degree a car salesperson. ",
    "Many touch typists also use keyboard shortcuts or hotkeys when typing on a computer. This allows them to edit their document without having to take their hands off the keyboard to use a mouse. An example of a keyboard shortcut is pressing the Ctrl key plus the S key to save a document as they type, or the Ctrl key plus the Z key to undo a mistake. Many experienced typists can feel or sense when they have made an error and can hit the Backspace key and make the correction with no increase in time between keystrokes.",
    "Business meetings, and professional recordings can contain sensitive data, so security is something a transcription company should not overlook when providing services. Companies should therefore follow the various laws and industry best practice, especially so when serving law firms, government agencies or courts. Medical Transcription specifically is governed by HIPAA, which elaborates data security practices and compliance measures to be strictly followed, failure of which leads to legal action and penalties. .",
    "Hunt and peck (two-fingered typing), also known as Eagle Finger, is a common form of typing in which the typist presses each key individually. Instead of relying on the memorized position of keys, the typist must find each key by sight. Use of this method may also prevent the typist from being able to see what has been typed without glancing away from the keys. Although good accuracy may be achieved, any typing errors that are made may not be noticed immediately due to the user not looking at the screen. There is also the disadvantage that because fewer fingers are used, those that are used are forced to move a much greater distance.",
    "The first personnel management department started at the National Cash Register Co. in 1900. The owner, John Henry Patterson, organized a personnel department to deal with grievances, discharges and safety, and training for supervisors on new laws and practices after several strikes and employee lockouts. During the 1970s, companies experienced globalization, deregulation, and rapid technological change which caused the major companies to enhance their strategic planning and focus on ways to promote organizational effectiveness."
]

var typingText = document.querySelector(".typing-text");
var inputfield = document.querySelector(".container .input-field");
var mistakes = 0;
var timeTag = document.getElementById('time');

let timer, maxTime = 60, timeLeft = maxTime

let charIndex = isTyping =  0;

function randomParagraph()
{
    let rnd = Math.floor(Math.random()*paragraphs.length);
    paragraphs[rnd].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });

    document.addEventListener("keydown",()=>inputfield.focus());
    typingText.addEventListener("click",()=> inputfield.focus());
}

function initTyping()
{
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputfield.value.split("")[charIndex] ;
    
    if(charIndex < characters.length - 1 && timeLeft > 0)
    {
        if(!isTyping)
        {
            timer = setInterval(initTimer,1000);
            isTyping = true;
        }
    
        if(typedChar == null)
        {
            charIndex--;
            characters[charIndex].classList.remove("correct","incorrect");
        }else{
            if(characters[charIndex].innerText === typedChar)
            {
                characters[charIndex].classList.add("correct");
            }
            else{
                characters[charIndex].classList.add("incorrect");
                mistakes++;
               console.log(mistakes)
               document.getElementById('mistake').innerHTML = mistakes;
            }
            charIndex++;
        }
        
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    
        var wpm = Math.round((((charIndex - mistakes) / 5)/(maxTime - timeLeft))*60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 :wpm;
        document.getElementById('wpm').innerText = wpm;
    }else{
        clearInterval(timer);
    }

    console.log("Total : ",characters.length);
    console.log("Mistakes : ",mistakes);
    console.log("Typed : ",charIndex);

    var acc = (100 - ((mistakes/charIndex)*100)).toFixed(0);

    document.getElementById("accuracy").innerText = `${acc}%`

}

function initTimer()
{
    if(timeLeft > 0)
    {
        timeLeft--;
        timeTag.innerText = `${timeLeft}s`;
    }
    else{
        clearInterval(timer);
    }
}

randomParagraph();
inputfield.addEventListener("input",initTyping);