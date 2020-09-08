function initialise() {
	sendRequest("?screen_name=USER_CLIENT_DETAILS", showClientDetails);
	sendRequest("?screen_name=USER_POLICIES", showClientPolicies);
}
function showClientDetails(clientDetails) {
	for ( var i = 0; i < document.getElementById("clientDetailsList")
			.getElementsByTagName("dd").length; i++) {
		var dd = document.getElementById("clientDetailsList")
				.getElementsByTagName("dd")[i];
		if (clientDetails[dd.id]) {
			while (dd.hasChildNodes())
				dd.removeChild(dd.firstChild);
			if (clientDetails[dd.id].constructor.toString().indexOf("Array") != -1) {
				for ( var j = 0; j < clientDetails[dd.id].length; j++) {
					dd.appendChild(document
							.createTextNode(clientDetails[dd.id][j]));
					dd.appendChild(document.createElement("br"));
				}
			} else
				dd.appendChild(document.createTextNode(clientDetails[dd.id]));
		}
	}
	document.getElementById("clientDetailsWaiting").style.display = "none";
}
function showClientPolicies(clientPolicies) {
	var ul = document.getElementById("policyDetailsList");
	while (ul.hasChildNodes())
		ul.removeChild(ul.firstChild);
	for ( var i = 0; i < clientPolicies.length; i++) {
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.href = "?screen_name=USER_CLIENT_DETAILS";
		a.appendChild(document.createTextNode(clientPolicies[i]));
		li.appendChild(a);
		ul.appendChild(li);
	}
	document.getElementById("policyDetailsWaiting").style.display = "none";
}
function createRequest() {
	var request = false;
	try {
		request = new XMLHttpRequest();
	} catch (trymicrosoft) {
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (othermicrosoft) {
			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (failed) {
				request = false;
			}
		}
	}
	if (!request)
		alert("Error initializing XMLHttpRequest!");
	return request;
}
function sendRequest(url, callback) {
	var request = createRequest();
	try {
		request.open("GET", url, true);
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200) {
					callback(eval("(" + request.responseText + ")"));
				} else if (request.status == 404)
					alert("{%(101)Request URL does not exist}");
				else
					alert("{%(102)Error: status code is }" + request.status);
			}
		};
		request.send(null);
	} catch (err) {
		alert("{%(100)Connection to the server lost}");
	}
}
