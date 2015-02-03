var listeners = {
	lineItems:{
		mouseover:function(e){
			var target = e.target || e.srcElement;
			target.style['color'] = '#C7C9D8';
			var node = {parent:null, child:target, target:null};
			node.target = node.child.nodeName.toLowerCase() == 'a' ? node.child.parentNode : node.child;
			node.target.style['backgroundPosition'] = '0px 0px';
		},
		mouseout:function(e){
			var target = e.target || e.srcElement;
			target.style['color'] = '#FFFFFF';
			var node = {parent:null, child:target, target:null};
			/* ensure we target the anchor tags parent */
			node.target = node.child.nodeName.toLowerCase() == 'a' ? node.child.parentNode : node.child;
			node.target.style['backgroundPosition'] = '0px 17px';
		}			
	}
};
var handlers = {
		addListeners:function(parmNodes, parmEvent, parmListener){
			var blnHasEventListener = !!window.addEventListener ? true : false;
			var nodesLength = parmNodes.length;
			for(var i = 0; i < nodesLength; i++){
				if(blnHasEventListener){
					parmNodes[i].addEventListener(parmEvent, parmListener, false);
				}else{
					parmNodes[i].attachEvent('on'+parmEvent, parmListener);
				}
			}
    }
};
var main = (function(parmDelay){
	var objMainInterval = setInterval(function(){
		if(document.getElementsByTagName('a').length > 1){
			clearInterval(objMainInterval);
			handlers.addListeners(document.getElementsByTagName('a'), 'mouseover', listeners.lineItems.mouseover);
			handlers.addListeners(document.getElementsByTagName('a'), 'mouseout', listeners.lineItems.mouseout);
			document.getElementsByTagName('body')[0].style['width'] = screen.width + 'px';
			document.getElementsByTagName('body')[0].style['height'] = screen.height + 'px';
		}
	}, parmDelay);
})(44);