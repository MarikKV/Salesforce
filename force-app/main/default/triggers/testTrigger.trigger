trigger testTrigger on order__c (before insert, after insert, after delete) {
    if (Trigger.isInsert) {
        if (Trigger.isBefore) {
            // Process before insert
        } else if (Trigger.isAfter) {
           TestTriggerHandler.sendEmailOnNewOrder();
        }        
    }
    else if (Trigger.isDelete) {
        TestTriggerHandler.sendMail('kosaniakm@gmail.com', 'Trailhead Tutorial', 'New order been deleted');
    }
}