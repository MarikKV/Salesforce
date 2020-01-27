({
    selectCategory : function(cmp, event) {
        //name of category
        var category = event.getSource().get('v.label');
        
        //get params for event
        var appEvent = $A.get("e.c:chuseCategoryEvent");
        appEvent.setParams({"cat" : category});
        appEvent.fire();
    }
})