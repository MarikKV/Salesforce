({
    selectCategory : function(cmp, event) {
        //name of category
        var category = event.getSource().get('v.title');
        var name = event.getSource().get('v.label');

        //console.log('title - ', category, 'label - ', name);
        var appEvent = $A.get("e.c:chuseCategoryEvent");
        appEvent.setParams({"cat" : category, "catName": name});
        appEvent.fire();
    }
})