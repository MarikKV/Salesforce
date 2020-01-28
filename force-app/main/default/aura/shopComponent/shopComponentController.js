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
    countTotalPrice : function(cmp, event) {
        var productsInCart = cmp.get("v.product");
        var totalPrice = 0;
        for(let i = 0; i < productsInCart.length; i++){
            totalPrice += productsInCart[i].price__c;
        }
        //console.log('all in cart', newList, 'all');
        //console.log('before push', cartProducts, 'all');
        console.log('totalPrice', totalPrice);
        cmp.set("v.totalPrice", totalPrice);
    },
    handleAddProductToCartEvent : function(cmp, event) {
        var product = event.getParam("product");
        var productsInCart = cmp.get("v.product");
        //console.log('all in cart', newList, 'all');
        //console.log('before push', cartProducts, 'all');
        productsInCart.push(product);
        console.log('after push', productsInCart);
        cmp.set("v.product", productsInCart);

        var countTotalPrice = cmp.get('c.countTotalPrice');
        $A.enqueueAction(countTotalPrice);
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
        var countTotalPrice = cmp.get('c.countTotalPrice');
        $A.enqueueAction(countTotalPrice);
    },
    handleCreateOrderEvent : function(cmp, event) {
        var newCustomer = event.getParam("newCustumer");
        console.log(newCustomer.Email__c, newCustomer.password__c);
        //Adding new custumer to DB
        var action = cmp.get("c.createNewCustomer");
        action.setParams({
            newCustomer: newCustomer
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
            var newCustomerInfo = response.getReturnValue();
            console.log(newCustomerInfo);
            //when login will be added
            //component.set("v.newCustomer", newCustomer);
            }else{
                console.log(JSON.stringify(response.getError()))
                console.log('failed response adding custumer')
            }
        });
        $A.enqueueAction(action);
        
        //Creating new order
        var actionOrder = cmp.get("c.createNewCustomer");
        actionOrder.setParams({
            newCustomer: newCustomer
        });
    }
})