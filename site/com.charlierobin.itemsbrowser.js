window.com = window.com || {};

if (window.com.charlierobin === undefined) window.com.charlierobin = {};

if (!window.jQuery) {
    throw new Error("Please install jQuery");
}

if (window.com.charlierobin.itemsbrowser === undefined) {
    window.com.charlierobin.itemsbrowser = {};
} else {
    throw new Error("window.com.charlierobin.itemsbrowser already defined");
}

(function (me) {

    // private properties

    var filterDelegate = null;
    var sortComparerDelegate = null;
    var items = [];
    var itemsToDisplay = [];
    var template = null;
    var root = null;
    var refreshTimeout = null;

    // TODO ... various ideas which may or may not be worth looking at

    // a default template which is just a div with data JSON stringified inside?
    // nominate a field name in data which can control selection of template from multiple named options
    // function to manually refresh data, or insert extra data from another source?
    // control class names and id which is given to "wrapper" div for each instance derived from template
    // run multiple instances so that two or more lists can be browsed on the same page?
    // callbacks into user code for template rendering etc allowing customisation?
    // callback (or something) which renders into listing if there are no items?
    // support for paging through large number of items?
    // support for infinite scrolling?

    // public properties

    me.autoRefreshWhenDataChanged = false;

    // public methods

    me.setRoot = function (selector) {
        root = selector;
    };

    me.setFilterDelegate = function (fn) {
        filterDelegate = fn;
    };

    me.setSortComparerDelegate = function (fn) {
        sortComparerDelegate = fn;
    };

    me.setTemplate = function () {
    };

    me.getTemplate = function (url) {

        axios.get(url)

            .then(function (response) {

                let str = response.data;
                let html = $.parseHTML(str);

                template = $(html).find("#template");

                $(template).removeAttr('id');
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () { });
    };

    me.getTemplateFromHeaderScriptWithSelector = function (selector) {

        const str = $(selector).html();

        let html = $.parseHTML("<div>" + str + "</div>");

        template = $(html);
    };

    me.getTemplateFromBodyHTMLWithSelector = function (selector) {

        template = $(selector);

        $(template).removeAttr('id');

        $("#listing").children().remove();
    };

    me.getData = function (url) {

        axios.get(url)

            .then(function (response) {

                const data = response.data;

                if (data === null) throw "response.data is null";

                if (typeof (data) !== 'object') throw "response.data is not an object";

                const newItems = data.items;

                if (!Array.isArray(items)) throw "data.items is not an array";

                items = newItems;

                if (me.autoRefreshWhenDataChanged) me.refresh();
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () { });
    };

    me.refresh = function () {

        if (template === null) {

            console.log("waiting for template");

            if (!refreshTimeout) {
                console.log("setting timeout for refresh");
                refreshTimeout = setTimeout(me.refresh, 1000);
            }

            return;
        }

        refreshTimeout = null;

        itemsToDisplay = items.filter(filterDelegate);

        itemsToDisplay.sort(sortComparerDelegate);

        $(root).children().remove();

        for (item of itemsToDisplay) {

            const newItem = template.clone(true)

            $(newItem).attr('id', "id-" + item.id);

            const elementsWithDataContent = $(newItem).find("[data-content]");

            elementsWithDataContent.each(function (index, elem) {

                const name = $(elem).attr("data-content");

                if (item.hasOwnProperty(name)) {

                    const type = $(elem).prop("nodeName");

                    if (type == "IMG") {
                        $(elem).attr("src", "pictures/" + item[name]);
                    } else {
                        $(elem).text(item[name]);
                    }

                } else {

                    $(elem).text("undefined");
                }
            });

            $(root).append(newItem);
        }
    };

    me.getDistinctValuesFor = function (name) {

        var values = [];

        items.forEach((value, index, array) => {
            if (!values.includes(value[name])) values.push(value[name]);
        });

        return values;
    };

    me.getMaximumValueFor = function (name) {

        var maximum = null;

        items.forEach((value, index, array) => {
            if (maximum === null) {
                maximum = value[name];
            }
            else {
                if (value[name] > maximum) maximum = value[name];
            }
        });

        return maximum;
    };

    me.getMinimumValueFor = function (name) {

        var minimum = null;

        items.forEach((value, index, array) => {
            if (minimum === null) {
                minimum = value[name];
            }
            else {
                if (value[name] < minimum) minimum = value[name];
            }
        });

        return minimum;
    };

    // private methods

}(window.com.charlierobin.itemsbrowser));


