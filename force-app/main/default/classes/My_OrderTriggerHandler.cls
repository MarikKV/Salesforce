public class My_OrderTriggerHandler extends Handler implements Schedulable {
    public override void onAfterInsert(Handler.TriggerContext context) {
        new OrderEmailTriggerHandler().sendEmailOnOrder(context.newList);
    }
    public void execute(SchedulableContext context) {
        new OrderEmailScheduledService(0).sendEmailOnOldOrder();
    }
    private virtual class OrderEmailService {
        private final String profileName;
        public OrderEmailService(String profileName) {
            this.profileName = profileName;
        }
        public void sendEmailOnOrder(List<order__c> orders) {
            List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
            List<String> recievers = this.getUserIdsByProfile(this.profileName);
            for (order__c order : orders) {
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                mail.setToAddresses(recievers);
                mail.setPlainTextBody('New Order created ' + order.Id + 'Some data');
                mails.add(mail);
            }
            Messaging.sendEmail(mails);
        }
    
        public List<Id> getUserIdsByProfile(String profileName) {
            List<Profile> profiles = [SELECT Id FROM Profile WHERE Name = :profileName];
            List<User> users = [SELECT Id FROM User WHERE ProfileId IN :profiles];
            return new List<String>(new Map<String, User>(users).keySet());
        }
    }
    private class OrderEmailScheduledService extends OrderEmailService {
        private final Integer days;
        public OrderEmailScheduledService(Integer days) {
            super('Shop Admin');
            this.days = days;
        }
        public List<order__c> queryOrders() {
            return Database.query('SELECT Id FROM order__c WHERE LastModifiedDate < LAST_N_DAYS:' + this.days);
        }
        public void sendEmailOnOldOrder() {
            this.sendEmailOnOrder(this.queryOrders());
        }
    }
    private class OrderEmailTriggerHandler extends OrderEmailService {
        public OrderEmailTriggerHandler() {
            super('Shop Admin');
        }
    }
}