function(e,t){
if(e!=t&&angular.isDefined(t)&&o[s.ngModel]===!0){
var n=p(o.$parent);p.assign(o.$parent,i(n,t,g)),p.assign(o.$parent,r(n,e,g))}
}),
angular.isFunction(o.$parent.$watchCollection)?o.$parent.$watchCollection(f,c):o.$parent.$watch(f,c,!0)}return{
restrict:"A",priority:1e3,terminal:!0,scope:!0,
compile:function(e,t){
if(!t.checklistValue&&!t.value)throw"You should provide `value` or `checklist-value`.";
return t.ngModel||t.$set("ngModel","checked"),o}}}]);
