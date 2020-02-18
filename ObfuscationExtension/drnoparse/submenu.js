function optionclicked(e) {
	const txt = e.target.textContent;
	switch(txt) {
		case "Disable":
		case "Swap chars":
		case "Chars or accents":
		case "Chars and accents":
			browser.tabs.query({active: true, currentWindow: true})
					.then(tabs=>{
				browser.tabs.sendMessage(tabs[0].id, {
					command: "drnoparse",
					action: txt,
				});
			});
			break;
	}
	console.log("DBG", "CLICK", e.target.textContent);
}
console.log("DBG", "LOADING", document.body);
[].slice.call(document.querySelectorAll("button.button")).forEach(btn=>{
	btn.addEventListener("click", optionclicked);
});
console.log("DBG", "LOADED", document.body);
