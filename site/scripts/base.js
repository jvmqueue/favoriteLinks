var dataProcessing = {
	tempListData:function(parmXMLNode){
		var frag = document.createDocumentFragment();
		var nodeNew = null;
		var nodeText = null;
		var xmlChildren = parmXMLNode.childNodes;
		var xmlChildrenLength = xmlChildren.length;
		for(var i = 0; i < xmlChildrenLength; i++){
			if(xmlChildren[i].nodeType == 1){
				nodeNew = document.createElement('pre');
				nodeText = document.createTextNode(xmlChildren[i].getAttribute('cat'));
				nodeNew.appendChild(nodeText);
				frag.appendChild(nodeNew);
			}
			document.getElementsByTagName('body')[0].appendChild(frag);
		}
	}
};
var listeners = {
	lineItems:{
		mouseover:function(e){
			var target = e.target || e.srcElement;
			target.nodeName.toLowerCase() == 'li' ? target : target = target.parentNode;
			target.style['backgroundPosition'] = '0px -114px';
		},
		mouseout:function(e){
			var target = e.target || e.srcElement;
			target.nodeName.toLowerCase() == 'li' ? target : target = target.parentNode;
			target.style['backgroundPosition'] = '';
		}			
	}
};
var handlers = {
		addListeners:function(parmNodes, parmEvent, parmListener){
			var blnHssEventListener = !!window.addEventListener ? true : false;
			var nodesLength = parmNodes.length;
			for(var i = 0; i < nodesLength; i++){
				if(blnHssEventListener){
					parmNodes[i].addEventListener(parmEvent, parmListener, false);
				}else{
					parmNodes[i].attachEvent('on'+parmEvent, parmListener);
				}
			}
        }
};
var main = (function(parmDelay){
	setTimeout(function(){
		handlers.addListeners(document.getElementsByTagName('li'), 'mouseover', listeners.lineItems.mouseover);
		handlers.addListeners(document.getElementsByTagName('li'), 'mouseout', listeners.lineItems.mouseout);
//		document.getElementsByTagName('body')[0].appendChild(document.createTextNode(xml.docElm.childNodes.length));
		dataProcessing.tempListData(xml.docElm);
		
	}, parmDelay);
})(777);