jQuery.fn.extend({

    pjax_menu: function (attr) {
        $ = $ || jQuery;
        var ul = this.find("ul"),
            string_segments = get_url().string_segments,
            mapping,
            matcher,
            that = this;

        matcher = (typeof attr != 'undefined') ? attr : 'url-matcher';

        //build mapping
        mapping = get_mapping();

        // make current active
        for (var el in  mapping) {
            if (is_current(el)) {
                reset_active(mapping);
                mapping[el].closest('li').addClass('active');
            }
        }
        // pjax complete call
        $(document).on('pjax:complete', function () {
            $(that).pjax_menu(attr);
        });
        window.onpopstate = function () {
            $(that).pjax_menu(attr);
        };


        //support functions
        function get_url() {
            var helper = Helper(),
                url_segments = helper.format_segments(window.location.pathname),
                get_params = helper.format_get_string(window.location.search),
                string_segments = (window.location.pathname + window.location.search);
            return {
                "protocol": window.location.protocol,
                "host": window.location.host,
                "url_segments": url_segments,
                "string_segments": string_segments,
                "get_params": get_params};

            function Helper() {
                return {
                    format_segments: function (segment_string) {
                        // this function removes "/" from the beginning and the end of the string
                        // ex: /node/add/app-announce/  return node/all/app-announce
                        // removing first backslash
                        var segments = (segment_string.indexOf("/") == 0) ? segment_string.substring(1) : segment_string;
                        //removing last backslash
                        segments = (segments.lastIndexOf("/") == (segments.length - 1)) ? segments.substring(0, (segments.length - 1)) : segments;
                        segments = segments.split("/");
                        return segments;
                    },
                    format_get_string: function (get_string) {
                        var prmstr = get_string.substr(1);
                        var prmarr = prmstr.split("&");
                        var params = {};
                        for (var i = 0; i < prmarr.length; i++) {
                            var tmparr = prmarr[i].split("=");
                            params[tmparr[0]] = tmparr[1];
                        }
                        return params;
                    }
                }
            }
        }

        function format_link(link) {
            if (link.indexOf("/") == 0) {
                link = link.substring(1);
            }
            if (link.indexOf("/") == link.length - 1) {
                link = link.substring(0, link.length - 1);
            }
            return link;
        }

        function reset_active(mapping) {
            for (var el in mapping) {
                mapping[el].closest('li').removeClass("active");
            }
        }

        function get_mapping() {
            var container,
                mapping = {},
                parts;

            //iterate through 'this' object and find all objects that correspond to the matcher var
            container = $(that).find('*').map(function (e) {
                if ($(this).is("[" + matcher + "]")) return this;
            });

            //create mapping of objects(for example links) and their urls that they are mapped to
            container.each(function () {
                parts = $(this).attr(matcher).split(' ');
                if (parts.length > 1) {
                    for (var i = 0; i < parts.length; i++) {
                        mapping[parts[i]] = $(this);
                    }
                } else
                    mapping[$(this).attr(matcher)] = $(this);
            });
            return mapping;
        }

        function is_current(element) {
            var regex = new RegExp(element);
            if (string_segments.match(regex))
                return true;
            return;
        }


    }
});