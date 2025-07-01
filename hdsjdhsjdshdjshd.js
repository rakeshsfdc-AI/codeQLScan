 function() {
            define("require exports ../core/tsSupport/extendsHelper ../core/tsSupport/decorateHelper ../core/accessoireSupport/typescript ../core/Error ../core/lang ../geometry/Extent ../core/JSONSupporter ../core/LoadableAccessoire ./Portal ../core/promiseUtils".split(" "),
                function(a, h, m, n, g, k, f, e, d, c, b, p) {
                    return function(a) {
                        function d(b) {
                            a.call(this);
                            this.url = this.typeKeywords = this.type = this.title = this.thumbnailUrl = this.tags = this.snippet = this.portal = this.ownerFolder = this.name = this.modified = this.itemUrl = this.itemControl = this.isLayer = this.id = this.extent = this.description = this.created = null
                        }
                        m(d, a);
                        d.prototype._isLayerGetter = function() {
                            return -1 < "Map Service;Feature Service;Feature Collection;Scene Service;Image Service;Stream Service;Vector Tile Service".split(";").indexOf(this.type)
                        };
                        d.prototype._itemUrlGetter = function() {
                            var a = this.get("portal.restUrl");
                            return a ? a + "/content/items/" + this.id : null
                        };
                        d.prototype._thumbnailUrlGetter = function() {
                            var a = this.itemUrl,
                                b = this.thumbnail;
                            return a && b ? this.portal._normalizeUrl(a + "/info/" + b) : null
                        };
                        d.prototype.load = function() {
                            var a = this;
                            this.portal || (this.portal = b.getDefault());
                            var c = this.portal.load().then(function() {
                                return a.resourceInfo ? a.resourceInfo : a.id && a.itemUrl ? a.portal._request(a.itemUrl) : {}
                            }).then(function(b) {
                                a.resourceInfo = b;
                                a.read(b)
                            });
                            this.addResolvingPromise(c);
                            return this
                        };
                        d.prototype.fetchData = function(a) {
                            void 0 === a && (a = "json");
                            return this.portal._request(this.itemUrl + "/data", {
                                responseType: a
                            })
                        };
                        d.prototype.fetchRelatedItems = function(a) {
                            return this.portal._requestToTypedArray(this.itemUrl + "/relatedItems", {
                                query: a
                            }, "PortalItem")
                        };
                        d.prototype.update = function(a) {
                            var b = this,
                                c = a && a.data;
                            a = {
                                method: "post"
                            };
                            a.query = this.toJSON();
                            for (var d in a.query) null === a.query[d] && (a.query[d] = "");
                            a.query.clearEmptyFields = !0;
                            "string" === typeof c ? a.query.text =
                                c : c && "function" === typeof c.toJSON && (a.query.text = JSON.stringify(c));
                            return (d = this.portal && this.portal.user && this.portal.user.userContentUrl) ? (this.ownerFolder && (d += "/" + this.ownerFolder), this.portal._request(d + ("/items/" + this.id + "/update"), a).then(function() {
                                return b.loaded ? b._reload() : b.load()
                            })) : p.reject(new k("portal:not-signed-in", "Not signed in"))
                        };
                        d.prototype.toJSON = function() {
                            var a = this.extent,
                                a = {
                                    created: this.created && this.created.getTime(),
                                    description: this.description,
                                    extent: a && [
                                        [a.xmin, a.ymin],
                                        [a.xmax, a.ymax]
                                    ],
                                    id: this.id,
                                    modified: this.modified && this.modified.getTime(),
                                    name: this.name,
                                    ownerFolder: this.ownerFolder,
                                    thumbnail: this.thumbnail,
                                    title: this.title,
                                    type: this.type,
                                    typeKeywords: this.typeKeywords,
                                    url: this.url
                                };
                            return f.fixJson(a)
                        };
                        d.fromJSON = function(a) {
                            if (!a) return null;
                            if (a.declaredClass) throw Error("JSON object is already hydrated");
                            return new d({
                                resourceInfo: a
                            })
                        };
                        d.prototype._reload = function() {
                            var a = this;
                            return this.portal._request(this.itemUrl, {
                                query: {
                                    _ts: (new Date).getTime()
                                }
                            }).then(function(b) {
                                a.resourceInfo =
                                    b;
                                a.read(b);
                                return a
                            })
                        };
                        n([g.shared("esri.portal.PortalItem")], d.prototype, "declaredClass", void 0);
                        n([g.property({
                            type: Date
                        })], d.prototype, "created", void 0);
                        n([g.property()], d.prototype, "description", void 0);
                        n([g.property({
                            type: e,
                            reader: function(a) {
                                return a && a.length ? new e(a[0][0], a[0][1], a[1][0], a[1][1]) : null
                            }
                        })], d.prototype, "extent", void 0);
                        n([g.property()], d.prototype, "id", void 0);
                        n([g.property({
                            dependsOn: ["type"],
                            readOnly: !0
                        })], d.prototype, "isLayer", void 0);
                        n([g.property()], d.prototype, "itemControl",
                            void 0);
                        n([g.property({
                            dependsOn: ["portal.restUrl"],
                            readOnly: !0
                        })], d.prototype, "itemUrl", void 0);
                        n([g.property({
                            type: Date
                        })], d.prototype, "modified", void 0);
                        n([g.property()], d.prototype, "name", void 0);
                        n([g.property()], d.prototype, "ownerFolder", void 0);
                        n([g.property({
                            type: b
                        })], d.prototype, "portal", void 0);
                        n([g.property()], d.prototype, "resourceInfo", void 0);
                        n([g.property()], d.prototype, "snippet", void 0);
                        n([g.property()], d.prototype, "tags", void 0);
                        n([g.property()], d.prototype, "thumbnail", void 0);
                        n([g.property({
                            dependsOn: ["itemUrl",
                                "thumbnail", "portal.credential.token"
                            ],
                            readOnly: !0
                        })], d.prototype, "thumbnailUrl", void 0);
                        n([g.property()], d.prototype, "title", void 0);
                        n([g.property()], d.prototype, "type", void 0);
                        n([g.property()], d.prototype, "typeKeywords", void 0);
                        n([g.property()], d.prototype, "url", void 0);
                        return d = n([g.subclass([c])], d)
                    }(d)
                })
        }
