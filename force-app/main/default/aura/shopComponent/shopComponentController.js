({
    doInit: function(component, event, helper) {
        var action = component.get("c.getItems");
        var action2 = component.get("c.getProductsItems");
        
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                console.log('good response category',  response.getReturnValue());
                component.set('v.items', response.getReturnValue());
            }else{
                console.log('Failed to response for category');
            }
        });
        action2.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                console.log('good response products',  response.getReturnValue());
                component.set('v.productItems', response.getReturnValue());
            }else{
                console.log('Failed to response for products');
            }
        });
        $A.enqueueAction(action);
        $A.enqueueAction(action2);
    },
    handleChuseCategoryEvent : function(cmp, event) {
        var category = event.getParam("cat");
        var categoryName = event.getParam("catName");
        
        cmp.set("v.cat", category);
        cmp.set("v.catName", categoryName);
    },
    handleAddProductToCartEvent : function(cmp, event) {
        var product = event.getParam("product");
        var productsInCart = cmp.get("v.product");
        //console.log('all in cart', newList, 'all');
        //console.log('before push', cartProducts, 'all');
        productsInCart.push(product);
        console.log('after push', productsInCart);
        cmp.set("v.product", productsInCart);
    },
    handleDelProductFromCartEvent : function(cmp, event) {
        var product = event.getParam("product");
        var productsInCart = cmp.get("v.product");
        console.log('Id', product, 'arr', productsInCart, 'length ', productsInCart.length);
        for(let i = 0; i < productsInCart.length; i++){
            if(productsInCart[i].Id === product){
                console.log(i, productsInCart[i].name__c);
                productsInCart.splice(i, 1);
            }else{
                console.log('pff');
            } 
        }
        cmp.set("v.product", productsInCart);
        /*console.log(productsInCart[0].name__c, productsInCart[1].name__c, productsInCart[2].name__c);
        console.log('all in cart', newList, 'all');
        console.log('before push', cartProducts, 'all');
        productsInCart.push(product);
        console.log('after push', productsInCart);
        cmp.set("v.product", productsInCart);*/
    }
})