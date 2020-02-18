function optionclicked(e) {
    const input = e.target;
	const txt = input.parentNode.parentNode.textContent.trim();
    console.log("CL", e, txt);
	switch(txt) {
		case "Enabled":
		case "Swap chars":
		case "Add accents":
			browser.tabs.query({active: true, currentWindow: true})
					.then(tabs=>{
                console.log("Extension drnoparse", "switching option", txt, "to", input.checked);
				browser.tabs.sendMessage(tabs[0].id, {
					command: "drnoparse",
					action: txt,
					status: !!input.checked,
				});
			});
			break;
	}
}
console.log("Extension drnoparse", "loading");
browser.tabs.query({active: true, currentWindow: true})
        .then(tabs=>{
    browser.tabs.sendMessage(tabs[0].id, {
        command: "getdrnoparsestatus",
    }).then(response=>{
        const OPTIONS = response.status;
        const buttons = [].slice.call(document.querySelectorAll(".switch input"));
        console.log("Extension drnoparse", "current page options", OPTIONS);
        buttons.forEach((btn,i)=>{
            btn.checked = OPTIONS[["enabled","swap","diatrics"][i]];
            btn.addEventListener("click", optionclicked);
        });
    });
});

