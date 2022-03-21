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

const captcha_input_element = document.querySelector("#valuepkg3");
captcha_input_element.value = answer;