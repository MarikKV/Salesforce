({
    doInit: function(component, event, helper) {
        var action = component.get("c.getItems");
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set('v.items', response.getReturnValue())
            }else{
                console.log('Failed to response');
            }
        });
        $A.enqueueAction(action);
    }
})