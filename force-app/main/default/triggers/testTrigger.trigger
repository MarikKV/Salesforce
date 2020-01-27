trigger testTrigger on order__c (after insert, after update) {
    HandlerExecutionPool.getInstance().getHandler(order__c.class).execute();
}