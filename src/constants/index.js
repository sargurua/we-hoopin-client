export const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

export function LightenDarkenColor(col, amt) {
  
    console.log(col)

    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    console.log((usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16));

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}

export const suffix = (function() {
	var s = ['th', 'st', 'nd', 'rd'];
	return function(n) {
		var d = (n|0)%100;
		return d > 3 && d < 21 ? 'th' : s[d%10] || 'th';
	}
})();