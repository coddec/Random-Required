/*jshint esversion: 6 */
/*
 *  Random-Required
 *  Copyright (C) coddec https://github.com/coddec
 *  Free to use/modify/improve/fork (credits/author information must not be removed or modified), no commercial use allowed at all.
 *  For commercial use or other matters, contact me at https://goo.gl/AKt4Vr
 */

/* //--------------------window.crypto won't work with web worker------------------------//
function RdnIntInclusive(min, max) {
	"use strict";
	const myrandomBuffer = new Uint32Array(10);
	window.crypto.getRandomValues(myrandomBuffer);
	let myrandomNumber = myrandomBuffer[0] / (0xffffffff + 1);
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(myrandomNumber * (max - min + 1)) + min;
}
*/

function RdnIntInclusiveWorse(min, max) {
	"use strict";
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generate(input_string, out_length, out_quantity, only_once) {
	"use strict";
	var i = 0;
	var j = 0;
	var str_final_output = '';
	var tmp_str = '';
	var rdn_num = '';
	if (only_once !== true) {
		for (i = 0; i < out_quantity; i++) {
			for (j = 0; j < out_length; j++) {
				rdn_num = RdnIntInclusiveWorse(0, input_string.length - 1);
				tmp_str += input_string.charAt(rdn_num);
			}
			tmp_str += '\n';
		}
	} else {
		var my_input_string = input_string;
		var my_out_length = out_length;
		for (i = 0; i < out_quantity; i++) {
			my_input_string = input_string;
			my_out_length = out_length;
			for (j = my_out_length; j > 0; j--) {
				rdn_num = RdnIntInclusiveWorse(0, my_input_string.length - 1);
				tmp_str += my_input_string.charAt(rdn_num);
				my_input_string = my_input_string.slice(0, rdn_num) + my_input_string.slice(rdn_num + 1);
				my_out_length -= 1;
			}
			tmp_str += '\n';
		}
	}
	str_final_output = tmp_str;
	return str_final_output;
}

/* // ----------------onmessage way vs self.addEventListener way--------------------------//
onmessage = function (e) {
	"use strict";
	//console.log('Message received from main script');
	var my_input_string = e.data[0];
	var my_out_length = e.data[1];
	var my_out_quantity = e.data[2];
	var my_only_once = e.data[3];
	var my_GUID_UUID = e.data[4];
	console.log('Generator: Start to generate');
	postMessage('1');
	var workerResult = generate(my_input_string, my_out_length, my_out_quantity, my_only_once, my_GUID_UUID);
	console.log('Generator: Generated, posting back to main');
	postMessage(workerResult);
	console.log('Generator: Posted to main');
}
*/


self.addEventListener('message', function (e) {
	"use strict";
	var my_input_string = e.data[0];
	var my_out_length = e.data[1];
	var my_out_quantity = e.data[2];
	var my_only_once = e.data[3];
	var my_GUID_UUID = e.data[4];
	//console.log('Generator: Start to generate');
	var workerResult = generate(my_input_string, my_out_length, my_out_quantity, my_only_once, my_GUID_UUID);
	//console.log('Generator: Generated, posting back to main');
	postMessage(workerResult);
	//console.log('Generator: Posted to main');
}, false);
