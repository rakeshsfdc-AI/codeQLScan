function processAjaxResponse(i, o, j, e, tb) {
  if (o === "success" || o === "notmodified") {
    j.html(e ? c("<div />").append(i.responseText.replace(tb, "")).find(e) : i.responseText);
  }
}

c.ajax({
  url: a,
  type: f,
  dataType: "html",
  data: b,
  complete: function(i, o) {
    processAjaxResponse(i, o, j, e, tb);
    // Optionally, if you still need to call the callback function d:
    d && j.each(d, [i.responseText, o, i]);
  }
});
