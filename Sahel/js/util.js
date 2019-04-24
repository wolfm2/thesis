// returns a range in array form
function range(start, end) {
	var offset = 0;
	if (start != 0) offset = start;
	return Array.from({length: end-start+1}, (v, k) => k+offset);
}

// rotate numbers
function numRotate(cur, max, action) {
	
	switch(action) {
		case '-':
			cur--;
			if (cur < 0) cur = max;
			break;
		case '+':
			cur++;
			if (cur > max) cur = 0
			break;
		default:
			cur = action;
	}
	return cur;
} 

// will create indermediary keys automagically
function autoDict() {
	return new Proxy({}, {
						get (target, key) {
							return target.hasOwnProperty(key) && target[key] || (target[key] = {});
						}
					});
}

// js version is crap 
// significance formatter - does not enforce unneeded float zeros after float
function maxSign(num, s) {
	if (s == undefined) s = 2;
	return (parseInt([num][0]*(1*(10**s)))/(10**s));
}
