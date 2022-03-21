const http = require("http");

let SECRET = "NASTY";

function myFunction(req, res) {
	console.log(req.url);

	let newreq = req.url.split("?q=");

	let feedback = ""
	let GUESS = ""
	
	if (newreq.length>1){
		GUESS = newreq[1];
		if (GUESS.length!=SECRET.length){
			feedback= "Error: length of guess should be "+SECRET.length.toString();
		}else{
			const guessarr = GUESS.split('');
			const secretarr = SECRET.split('');
		
			let secretfreq ={};
			for (let i = 0; i < secretarr.length; i++) {
				let freq = 0;
				for (let j = 0; j < secretarr.length; j++) {
					if (secretarr[i]==secretarr[j]){freq++};
				}
				secretfreq[secretarr[i]]=freq;
			}
		
			let appearences = {};
				
			for (let i=0; i<guessarr.length; i++) {
				appearences[guessarr[i]] = appearences[guessarr[i]] ? appearences[guessarr[i]] + 1 : 1;
				if (secretarr.includes(guessarr[i]) & appearences[guessarr[i]]<=secretfreq[guessarr[i]]){
					if (guessarr[i]==secretarr[i]){
						feedback+='g';
					}else{
						feedback+='y';
					}
				}else{
					feedback+='b';
				}
			}
		}
	}

	res.write(feedback);
	res.end();
}

http.createServer(myFunction).listen(8080);
