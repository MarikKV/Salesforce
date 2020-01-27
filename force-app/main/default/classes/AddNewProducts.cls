public class AddNewProducts {
    public void getProducts(){
      HttpRequest req = new HttpRequest(); 
      Http http = new Http();

      req.setMethod('GET');
      req.setEndpoint( 'https://lviv-courses-1-developer-edition.eu32.force.com/services/apexrest/products' );
    
      //Set the HTTPRequest body	    
      HttpResponse response = http.send(req);
      
      System.debug(response.getBody());
      //List<product__c> productList = (List<product__c>) JSON.deserialize(JSON.deserializeUntyped(response.getBody(), List<product__c>.class));
      //System.debug(JSON.deserializeUntyped(response.getBody(), List<product__c>.class));
	}
}