({
    createOrder : function(component, event, helper) {
        var newCustumer = component.get("v.newCustumer");
        console.log(newCustumer.password__c, newCustumer.Email__c);
        if(newCustumer.password__c !== '' && newCustumer.Email__c !== ''){
            var appEvent = $A.get("e.c:createOrderEvent");
            appEvent.setParams({"newCustumer" : newCustumer});
            appEvent.fire();
        }else{
            console.log('empty fields')
        }
    }
})
