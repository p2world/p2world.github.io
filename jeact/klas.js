(function() {
    /**
     * klas is a global variable
     * [super_],[mixin..],proto
     */
    Klas = function() {};
    Klas.extend = function() {
        var super_ = this;
        var superProto = super_.prototype;
        var proto;
        var mixins = [];

        // init params
        if (arguments.length === 0) {
            proto = {};
        } else {
            mixins = [].slice.call(arguments, 0, -1);
            proto = arguments[arguments.length - 1];
        }

        // default constructor
        var ctor;
        if (proto.hasOwnProperty('constructor')) {
            ctor = proto.constructor;
        } else {
            ctor = function() {
                super_.apply(this,arguments);
            };
        }

        // inherit super_`s methods
        var TempCtor = function() {};
        TempCtor.prototype = superProto;
        var realProto = ctor.prototype = new TempCtor();


        // inherit super_`s static functions
        extend(ctor, super_);

        // inherit mixins
        for (var i = 0; i < mixins.length; i++) {
            // inherit mixin`s static functions
            var mixin = mixins[i];
            extend(ctor, mixin);

            // inherit mixin`s methods
            var _proto = mixin.prototype;
            extend(realProto, _proto);
        }


        // static functions
        if (proto.statics) {
            extend(ctor, proto.statics);
            delete proto.statics;
        }

        // set superClass
        ctor.super_ = super_;
        proto.superProto_ = superProto;

        // extends proto
        extend(realProto, proto);

        return ctor;
    };

    function extend(obj, extension) {
        for (var prop in extension) {
            obj[prop] = extension[prop];
        }
    }
})();
