trigger testTrigger on order__c ( after insert ) {
    if (Trigger.isAfter) {
        if (Trigger.isInsert) {
           new TestTriggerHandler.sendEmailOnNewOrder();
        }        
    }
}