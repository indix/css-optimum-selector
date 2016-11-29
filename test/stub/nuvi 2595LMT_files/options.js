function updateNextOption(productId, groupId, selectedOption, lastOptionGroupID, batchMode, selectedOptions, cartItemId){
	var indexId = productId;

	if(cartItemId && cartItemId != '' && cartItemId != 'undefined'){
		indexId = cartItemId;
	}

	//If the user has changed a drop down which is displayed in the middle of the chain, hide the ones after it.
	if(currentDisplayedOptionGroup[indexId] > groupId){
		for(var i=currentDisplayedOptionGroup[indexId];i>groupId;i--){
			hideOptionGroup(indexId, i);
		}
	}

	if(selectedOption && selectedOption != '' && selectedOption != 'undefined'){
		//Build a string of previous group option ids.
		var optionIDString = buildOptionIDString(indexId, groupId, selectedOption);
		var nextGroupId = parseInt(groupId) + parseInt(1);
		var optionsElementName = 'optionGroupOptions-' + indexId + '-' + nextGroupId;
		var optionElement = null;
		var dropdownElementName = 'optionGroup-' + indexId + '-' + nextGroupId;
		var dropdownElement = null;
		var photoElementName = 'optionGroupSwatches-' + indexId + '-' + nextGroupId;
		var photoElement = null;
		var photoDisplayElementName = 'optionGroupSwatchesDisplay-' + indexId + '-' + nextGroupId;
		var photoDisplayElement = null;

		if(batchMode && batchMode != '' && batchMode != 'undefined'){
			batchMode = true;
		} else {
			batchMode = null;
		}

		//Display the loading image.
		if(dropdownElement = document.getElementById(dropdownElementName)){
			dropdownElement.style.display = 'block';

			if(photoElement = document.getElementById(photoElementName)){
				photoElement.style.display = 'block';
			}

			if(photoDisplayElement = document.getElementById(photoDisplayElementName)){
				var innerHtml = document.getElementById('optionGroupLoading').innerHTML;
				photoDisplayElement.innerHTML = innerHtml;
			}

			if(optionElement = document.getElementById(optionsElementName)){
				var innerHtml = document.getElementById('optionGroupLoading').innerHTML;
				optionElement.innerHTML = innerHtml;
			}
		}

		if(lastOptionGroupID && lastOptionGroupID != '' && lastOptionGroupID != 'undefined' && groupId == lastOptionGroupID && !batchMode){
			drawOptionMainImage(indexId, groupId);
		} else if(lastOptionGroupID && lastOptionGroupID != '' && lastOptionGroupID != 'undefined' && groupId != lastOptionGroupID) {
			x_getNextOptionDropDown(productId, groupId, selectedOption, optionIDString, lastOptionGroupID, batchMode, selectedOptions, cartItemId, optionGroupHandler);
		}
	} else {
		updatePrice();
	}
}


function optionGroupHandler(response){
	var pieces = response.split('|');
	var productId = pieces[0];
	var groupId = pieces[1];
	var lastOptionGroupID = pieces[2];
	var batchMode = pieces[3];
	var selectedOptions = pieces[4];
	var cartItemId = pieces[5];
	var photoHtml = decodeURIComponent(pieces[6]);
	var dropdownHtml = decodeURIComponent(pieces[7]);
	var indexId = productId;

	if(cartItemId && cartItemId != '' && cartItemId != 'undefined'){
		indexId = cartItemId;
	}

	var previousGroupId = groupId - 1;
	var elementName = 'optionGroup-' + indexId + '-' + groupId;
	var optionsElementName = 'optionGroupOptions-' + indexId + '-' + groupId;
	var optionElement = null;
	var selectedOption = null;
	var optionSelectElement = null;
	var optionSelectElementName = 'optionSelect-' + indexId + '-' + groupId;
	var optionDisplayPhotoElement = null;
	var optionDisplayPhotoElementName = 'optionGroupSwatchesDisplay-' + indexId + '-' + groupId;
	var opionPhotoElementName = 'optionGroupSwatches-' + indexId + '-' + groupId;

	if(optionDisplayPhotoElement = document.getElementById(optionDisplayPhotoElementName)){
		if(photoHtml && photoHtml != '' && photoHtml != 'undefined'){
			optionDisplayPhotoElement.innerHTML = photoHtml;
		} else {
			document.getElementById(opionPhotoElementName).style.display = 'none';
		}
	}

	if(optionDropDownElement = document.getElementById(optionsElementName)){
		optionDropDownElement.innerHTML = dropdownHtml;

		if(optionSelectElement = document.getElementById(optionSelectElementName)){
			selectedOption = optionSelectElement.value;
		}
	}

	currentDisplayedOptionGroup[indexId] = groupId;

	if(groupId == lastOptionGroupID){
		updatePrice();
	}

	updateNextOption(productId, groupId, selectedOption, lastOptionGroupID, batchMode, selectedOptions, cartItemId);
}


function hideOptionGroup(indexId, groupId){
	var groupElementName = 'optionGroup-' + indexId + '-' + groupId;
	var groupPhotoElementName = 'optionGroupSwatches-' + indexId + '-' + groupId;
	var optionGroup = null;
	var optionPhotoGroup = null;

	if(optionGroup = document.getElementById(groupElementName)){
		optionGroup.style.display = 'none';
	}

	if(optionPhotoGroup = document.getElementById(groupPhotoElementName)){
		optionPhotoGroup.style.display = 'none';
	}
}


function changeOption(productId, groupId, optionId, lastOptionGroupID, batchMode){
	var element = getOptionSelectElement(productId, groupId);

	if(element && element != '' && element != 'undefined'){
		if(batchMode && batchMode != '' && batchMode != 'undefined'){
			batchMode = true;
		} else {
			batchMode = null;
		}

		var options = element.options;
		var optionsLength = options.length;

		for(var i=0;i<optionsLength;i++){
			var current = options[i];

			if(current.value == optionId){
				if(element.selectedIndex != i){
					element.selectedIndex = i;

					if(lastOptionGroupID && lastOptionGroupID != '' && lastOptionGroupID != 'undefined' && groupId != lastOptionGroupID){
						updateNextOption(productId, groupId, current.value, lastOptionGroupID, batchMode);
					}
				}
			}
		}
	}
}


function getOptionSelectElement(indexId, groupId){
	var optionElementName = 'optionSelect-' + indexId + '-' + groupId;

	if(element = document.getElementById(optionElementName)){
		return element;
	}
}


function buildOptionIDString(indexId, groupId, selectedOption){
	var optionIDString = '';

	for(var i=1;i<groupId;i++){
		var groupElementName = 'optionSelect-' + indexId + '-' + i;
		var optionGroup = null;

		if(optionGroup = document.getElementById(groupElementName)){
			optionIDString += optionGroup.value + '-';
		}
	}

	optionIDString += selectedOption + '-';

	return optionIDString;
}


function drawOptionMainImage(indexId, groupId){
	var element = getOptionSelectElement(indexId, groupId);

	if(element && element != '' && element != 'undefined'){
		var selectedOption = element.value;
		optionIDString = '-' + buildOptionIDString(indexId, groupId, selectedOption);

		x_getOptionSetImages(optionIDString, optionImageHandler);
	}
}


function optionImageHandler(response){
	var pieces = response.split('|');
	var html = decodeURIComponent(pieces[0]);
	var caption = decodeURIComponent(pieces[1]);

	if(element = document.getElementById('optionMainImage')){
		if(html && html != '' && html != 'undefined'){
			//First let's hide all of the other displayed elements.
			if(displayedMain != ''){
				if(displayedElement = document.getElementById(displayedMain)){
					displayedElement.style.display = 'none';
				}
			}

			element.innerHTML = html;
			element.style.display = 'block';
			displayedMain = 'optionMainImage';

			var captionElement = 'prodCaption';
			html = '';

			if(caption && caption != ''){
				html += caption;
			} else {
				html += '&nbsp;';
			}

			document.getElementById(captionElement).innerHTML = html;
		}

		MagicZoom_stopZooms();
		MagicZoom_findZooms();
	}
}


function addOption(select, optionText, optionValue, optionId){
	var elements = select.options;
	var length = elements.length;

	/* Make sure the option doesn't already exist in the drop down. */
	for(var i=0;i<length;i++){
		var current = elements[i];

		if(current && current != '' && current != 'undefined'){
			if(current.text == optionText){
				return;
			}
		}
	}

	var option = document.createElement('option');

	option.text = optionText;
	option.value = optionValue;

	if(optionId && optionId != '' && optionId != 'undefined'){
		option.id = optionId;
	}

	try {
		select.add(option, null);
	} catch(ex){
		select.add(option);
	}
}


function removeOption(select, optionId){
	if(select && select != '' && select != 'undefined'){
		var elements = select.options;
		var length = elements.length;

		for(var i=0;i<length;i++){
			var current = elements[i];

			if(current && current != '' && current != 'undefined'){
				if(current.id == optionId){
					select.remove(i);
					break;
				}
			}
		}
	}
}