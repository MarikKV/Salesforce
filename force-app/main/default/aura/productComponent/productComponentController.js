({
	addToCart : function(component, event, helper) {
        //var category = event.getSource().get('v.label');

		var product = event.getSource().get('v.name');
        
        var items = component.get("v.item");
        var items2 = component.get("v.productsForCart");

        //items.push(product);

        console.log('add', product, 'now cart: ', items, items2);
        //component.set("v.productsForCart", product);

	}
})