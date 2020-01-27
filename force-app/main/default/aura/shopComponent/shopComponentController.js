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
    handleApplicationEvent : function(cmp, event) {
        var category = event.getParam("cat");

        // set the handler attributes based on event data
        cmp.set("v.cat", category);
        console.log(category);
    }
})