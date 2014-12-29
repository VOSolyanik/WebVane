(function setPlaceHolders(){
	var input = document.getElementsByTagName('input'); 
	var cls = "placeholdr"; 
	if (input) { 
		for (var i=0; i < input.length; i++) { 
			var t = input[i]; 
			var txt = t.getAttribute("placeholder");
			
			if (txt.length > 0) { 
				t.className = t.value.length == 0 ? t.className+" "+cls : t.className;
				t.value = t.value.length > 0 ? t.value : txt; 
				t.onfocus = function() { 
					this.className = this.className.replace(cls);
					this.value = this.value == this.getAttribute("placeholder") ? "" : this.value;
				}				
				t.onblur = function() {
					if (this.value.length == 0) {
						this.value = this.getAttribute("placeholder");
						this.className = this.className+" "+cls; // add class
					}
				}
			}  
		}
	}
})();