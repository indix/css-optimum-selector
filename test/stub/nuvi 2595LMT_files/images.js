function drawMainImage(key, imageCaption, pers, type, fromElement, altElement){
	var skip = false;

	if(altElement && altElement != 'undefined' && altElement != ''){
		var elementName = altElement + key;
	} else {
		var elementName = 'prodMainImage' + key;
	}

	if(!document.getElementById(elementName)){
		elementName = 'prodMainImage0';
	}

	if(currentElement = document.getElementById(elementName)){
		//If a checkbox has been clicked and it's now unchecked then skip this stuff.
		if(pers && pers != '' && pers != 'undefined' && type && type != '' && type != 'undefined' && type == 'checkbox'){
			if(fromElement.checked == false){
				skip = true;
			}
		}

		if(!skip){
			//First let's hide all of the other displayed elements.
			if(displayedMain != ''){
				if(displayedElement = document.getElementById(displayedMain)){
					displayedElement.style.display = 'none';
				}
			}

			//Now let's display the one we want.
			currentElement.style.display = 'block';
			displayedMain = elementName;

			//Now let's display the caption should there be one;
			var html = '';
			var captionElement = 'prodCaption';

			if(pers && pers != '' && pers != 'undefined'){
				var caption = persCaptions[key];
			} else {
				var caption = imageCaption;
			}

			if(caption && caption != ''){
				html += decodeURIComponent(caption);
			} else {
				html += '&nbsp;';
			}

			document.getElementById(captionElement).innerHTML = html;
		}
	}
}

function cycleThumbs(direction, key, url){
	var start;
	var end;
	var indexes = new Array();

	//First let's get our starting and ending points.
	if(direction > 0){
		start = parseInt(key) + parseInt(1);

		if(start > parseInt(totalCount) - parseInt(1)){
			start = parseInt(0);
		} else {
			//Nothing
		}

		end = parseInt(start) + (parseInt(maxThumbs) - parseInt(1));

		if(end > (parseInt(totalCount) - parseInt(1))){
			end = (parseInt(key) + parseInt(maxThumbs)) - parseInt(totalCount);
		} else {
			//Nothing
		}
	} else {
		end = parseInt(key) - parseInt(1);

		if(end < parseInt(0)){
			end = parseInt(totalCount) - parseInt(1);
		}

		start = parseInt(end) - (parseInt(maxThumbs) - parseInt(1));

		if(start < parseInt(0)){
			start = parseInt(totalCount) - (parseInt(start) * parseInt(-1));
		}
	}

	indexes.push(start);

	//Now that we have our starting and ending indexes we can grab the images and their respective alt tags, captions, etc.
	//to build the html we will return to the page.
	var photoSubGroups = new Array();
	photoSubGroups.push(photoGroups[start]);
	var trueStart = start;
	var current = start++;

	//We know the end points here, the trick is filling in the rest.  The minus one accounts for the end point.
	while(parseInt(photoSubGroups.length) < (parseInt(maxThumbs) - parseInt(1))){
		current++;
		if(!photoGroups[current]){
			current = 0;
		}

		photoSubGroups.push(photoGroups[current]);
		indexes.push(current);
	}

	photoSubGroups.push(photoGroups[end]);
	indexes.push(end);
	var groupLength = photoSubGroups.length;

	//Draw left arrow
	if(leftArrow = document.getElementById('prodThumbnailLeftArrow')){
		var leftArrowHtml = '<a href="javascript:cycleThumbs(\'-1\', ' + trueStart + ', \'' + url + '\')"><img src="' + url + '/images/left_photo.gif" width="13" height="20" alt="" border="0" /></a>';
		leftArrow.innerHTML = leftArrowHtml;
	}

	var x = 0;

	//Draw middle content
	for(j=0;j<groupLength;j++){
		elementIndex = 'productPhotoThumbnail' + x;

		if(element = document.getElementById(elementIndex)){
			var photoGroup = photoSubGroups[j];
			var thumb = photoGroup[0];
			var main = photoGroup[1];
			var popup = photoGroup[2];

			//set the individual photo div width to the width of the actual photo
			element.style.width = thumb[0] + 'px';

			//If a url has been specified for this image then use that.
			if(thumb[5]){
				var finalImageURL = thumb[5];
			} else {
				var finalImageURL = imageLocation + '/' + imageURL + '/' + thumb[2];
			}

			html = '<a href="javascript:swapImage()" onclick="javascript:drawMainImage';
			html += "('" + indexes[j] + "', '" + sanitizeString(main[3]) + "')";
			html += '">';
			html += '<img src="' + finalImageURL + '"';
			html += ' alt="' + thumb[4] + '" title="' + thumb[4] + '" border="0" width="' + thumb[0] + '" height="' + thumb[1] + '" />';
			html += '</a>';
			element.innerHTML = html;

			x++;
		}
	}

	//Draw right arrow
	if(rightArrow = document.getElementById('prodThumbnailRightArrow')){
		var rightArrowHtml = '<a href="javascript:cycleThumbs(\'1\', ' + end + ', \'' + url + '\')"><img src="' + url + '/images/right_photo.gif" width="13" height="20" alt="" border="0" /></a>';
		rightArrow.innerHTML = rightArrowHtml;
	}
}

function sanitizeString(string){
	if(string && string != ''){
		var length = string.length;
		var newString = '';
		var watch = '';
		var watchstring = '';

		for(i=0;i<length;i++){
			var char = string.charAt(i);

			if(char == "'"){
				char = "\'";
			} else if(char == '&'){
				watch = true;
			}

			if(watch != true){
				newString += char;
			}

			if(watch == true){
				watchstring += char;

				if(char == ';'){
					watch = false;

					if(watchstring == '&#039;'){
						newString += "\\'";
					}
				}
			}
		}

		return newString;
	}

	return '';
}

//This is just a dummy function.  The reason this is here is because previously the thumbnail images on the product detail page referenced # which
//would reload the page and always go to the top of the page.  By doing this the page does not need to be reloaded and will always remain at
//the position the user has scrolled to.
function swapImage(){

}

function showPreview(url, width, height){
	var optionString = "width=" + width + ", height=" + height;

	window.open(url, 'photo_preview', optionString);
}