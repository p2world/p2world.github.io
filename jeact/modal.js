/*
模板继承
 */

var Modal=Widget.extend({
/*
<div class="modal">
    <div class="modal_dialog">
        <%=this.contentTpl()%>
    </div>
</div>
 */
    template:null,
    contentTpl:function(){
        return '';
    }
});


var HelloModal=Modal.extend({
/*
<span>hello</span>
*/
    contentTpl:null
});