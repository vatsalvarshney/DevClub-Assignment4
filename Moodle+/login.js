console.log("Moodle+ successfully loaded!");
const login_element = document.querySelector("#login");
let login_text = login_element.innerText;

let question = login_text.split("\n")[3].split(" ");

let answer = "";

if (question[1]=="add") {
    let ans = Number(question[2])+Number(question[4]);
    answer = ans.toString();
} else if (question[1]=="subtract") {
    let ans = Number(question[2])-Number(question[4]);
    answer = ans.toString();
} else if (question[2]=="first") {
    answer = question[4].toString();
} else {
    answer =question[6].toString();
}

document.querySelector("#valuepkg3").value = answer;

document.querySelector("#username").value = "";   // put your moodle username inside the inverted commas
document.querySelector("#password").value = "";   // put your moodle password inside the inverted commas

if ((document.querySelector("#username").value != "") & (document.querySelector("#password").value != "")){
    document.querySelector("#loginbtn").click();
}
