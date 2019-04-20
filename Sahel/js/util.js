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
