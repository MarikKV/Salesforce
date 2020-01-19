trigger testTrigger on order__c (before insert) {
    if (Trigger.isAfter){
        if (Trigger.isInsert){
            TestTriggerHandler.sendMail('kosaniakm@gmail.com', 'Trailhead Tutorial', '1dsdsd23 body');
        }
    }
}