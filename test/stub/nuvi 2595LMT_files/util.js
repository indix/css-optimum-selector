function confirmMsg(msg) {
    if(!confirm(msg)) {
		return false;
    }

    return true;
}

function goThere(url){
	window.location.href = url;
}

function objExists(objToTest) {
	if (null == objToTest) {
		return false;
	}

	if ("undefined" == typeof(objToTest) ) {
		return false;
	}

	return true;
}

function getSelectValueByName(which, name){
	var length = name.length;

	for(i=0;i<which.length;i++) {
		var tempobj=which.elements[i];

		if(tempobj.name.substring(0,length)==name) {
			return getSelectedValue(which, tempobj);
		}
	}
}

function getSelectedValue(frm, obj){
	//does the object exist
	if(objExists(obj)){
		//does the object have any sub-entities		
		if(objExists(obj[0])){
			//if it does, is it a radio select?
			if(obj[0].type && obj[0].type == 'radio'){
				for(i=0; i<obj.length; i++){
					if(obj[i].checked){
						return obj[i].value;
					}
				}
			} else if(obj.type == 'select-one'){
				return obj[obj.selectedIndex].value;
			} else {

				alert(obj.type);
			}
		} else {
			//the object doesn't have any sub entites, so just return its value
			return obj.value;
		}
	}
}

function applyDisplay(element, value){
    if(document.getElementById(element)){
        document.getElementById(element).style.display = value;
    }
}

function confirmMsg(msg) {
    if (!confirm(msg)) {
    	return false;
    }

    return true;
}

function checkEmail(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   
    if(reg.test(email) == false) {
      	return false;
    }
    
    return true;
				
}

function numericSort(a, b){
	return a-b;
}


function ksort(array, numeric){
	if(numeric == null){
		numeric = true;
	}
	var keys = new Array();
	for(k in array){
		keys.push(k);
	}
	if(numeric){
		keys.sort(numericSort);
	} else {
		keys.sort();
	}
	array2 = new Array();
	for(var i = 0; i < keys.length; i++){
		if(!objExists(array2[keys[i]])){
			array2[keys[i]] = new Array();
		}
		array2[keys[i]] = array[keys[i]];
	}
	return array2;
}

/* Used for the all|none checkboxes with the batch delete functionality. */
function selectEntities(docHandle, type){
    var control = docHandle.elements.length;

    for (var i=0; i<control; i++) {
        var element = docHandle.elements[i];

        if ("entityCheckbox[]" == element.name.substring(0, 16)) {
            element.checked = ("all" == type);
        }
    }
}

function strPad(input, length, padString){
	while(input.length < length){
		input = padString + input;
	}
}

function convertToFloat(sText){
    var validChars = "0123456789.,";
    var character = '';
    var number ='';


    for (i = 0; i < sText.length; i++){
        character = sText.charAt(i);
        if (validChars.indexOf(character) == -1){

        } else {
            number += character;
        }
    }

    return number;
}