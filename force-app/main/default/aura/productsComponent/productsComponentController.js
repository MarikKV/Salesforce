({
    doInit: function(component, event, helper) {
        var action = component.get("c.getProductsItems");
        var action2 = component.get("c.getCategory");

        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.productItems', response.getReturnValue());
                console.log('Good response', response.getReturnValue());
            }else{
                console.log('Failed to response');
            }
        
        });
        action2.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.productCategory', response.getReturnValue());
                console.log('Good response category', response.getReturnValue());
            }else{
                console.log('Failed to response');
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
        $A.enqueueAction(action2);
    }
})