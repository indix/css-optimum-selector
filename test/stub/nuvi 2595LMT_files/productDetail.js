function updatePrice(){
	var which = document.productForm;
	var options = getSelectedOptions(which);
	var productId = which.productID.value;
	var personalizations = getSelectedPersonalizations();
	var quantity = getSelectedValue(which, which.quantity);

	x_getLiveProductTotal(productId, options, personalizations, '1', quantity, xtotalHandler);
}

function getSelectedOptions(form){
	var elements = form.elements;
	var length = elements.length;
	var optionString = '-';

	for(var i=0;i<length;i++){
		var current = elements[i];

		if(current.name.substring(0, 8) == 'options['){
			optionString += current.value + '-';
		}
	}

	return optionString;
}

function getSelectedPersonalizations(){
	var persString = '';

	for(var persID in persSelected){
		if(persSelected[persID] && persSelected[persID] != '' && persSelected[persID] != 'undefined'){
			for(var answerID in persSelected[persID]){
				if(persSelected[persID][answerID] != '' && persSelected[persID][answerID] != 'undefined'){
					answerText = encodeURIComponent(persSelected[persID][answerID]);
					persString = persString + persID + '|' + answerID + '|' + answerText + '-';
				}
			}
		}
	}

	return persString;
}

function updatePersSelectedArray(persID, element, type){
	var persAnswers = persSelected[persID];

	if(element){
		if(type == 'drop_down' || type == 'radio'){
			for(var answer in persAnswers){
				if(answer != element.value){
					persAnswers[answer] = '';
				} else {
					persAnswers[answer] = 'Y';
				}
			}
		} else if(type == 'checkbox'){
			for(var answer in persAnswers){
				if(answer == element.value){
					if(element.checked == true){
						persAnswers[answer] = 'Y';
					} else {
						persAnswers[answer] = '';
					}
				}
			}
		} else if(type == 'multi_select'){
			var selectOptions = element.options;
			var selectOptionsLength = selectOptions.length;

			for(var i=0;i<selectOptionsLength;i++){
				if(selectOptions[i].selected){
					persAnswers[selectOptions[i].value] = 'Y';
				} else {
					persAnswers[selectOptions[i].value] = '';
				}
			}
		} else if(type == 'text' || type == 'text_area'){
			for(var answer in persAnswers){
				if(element.value && element.value != '' && element.value != 'undefined'){
					persAnswers[answer] = element.value;
				} else {
					persAnswers[answer] = '';
				}
			}
		}
	}

	persSelected[persID] = persAnswers;
}

function changePersonalization(persID, answerID, type){
	if(type == 'checkbox' || type == 'radio'){
		var persElementName = 'persInput-' + persID + '-' + answerID;
	} else {
		var persElementName = 'persInput-' + persID;
	}

	if(persElement = document.getElementById(persElementName)){
		if(type == 'checkbox' || type == 'radio'){
			persElement.checked = true;
		} else {
			var options = persElement.options;
			var optionsLength = options.length;

			for(var i=0;i<optionsLength;i++){
				var current = options[i];

				if(current.value == answerID){
					persElement.selectedIndex = i;
				}
			}
		}
		
		updatePersSelectedArray(persID, persElement, type);
		updatePrice();
	}
}