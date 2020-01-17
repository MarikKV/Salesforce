trigger testTrigger on order__c (before insert) {
    if (Trigger.isAfter){
        if (Trigger.isInsert){
               System.debug('trigger has executed on after inser');
        }
    }
}