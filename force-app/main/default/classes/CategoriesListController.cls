public class CategoriesListController {
@AuraEnabled
    public static List<category__c> getItems() {
        return [SELECT Id, name__c
                FROM category__c];
    }
@AuraEnabled
    public static List<product__c> getProductsWidthId(String listString) {
        List<String> Ids = new List<String>();
        Ids = (List<String>)JSON.deserialize(listString, List<String>.class);
        return [SELECT Id, name__c, price__c, stock__c
                FROM product__c
                WHERE Id in: Ids];
    }
@AuraEnabled
    public static List<product__c> getProductsItems() {
        return [SELECT Id, name__c, price__c, stock__c, category__c
                FROM product__c];
    }

}