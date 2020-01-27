({
	addToCart : function(component, event, helper) {
        //var category = event.getSource().get('v.label');

        var product = event.getSource().get('v.name');
        console.log(product);
        //var prodId = event.getSource().get('v.category__c');

        //items.push(product);
        var appEvent = $A.get("e.c:addProductToCartEvent");
        appEvent.setParams({"product" : product});
        appEvent.fire();

        //console.log('add', product, 'to cart');
	}
})