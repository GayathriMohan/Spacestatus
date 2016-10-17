var Status = Backbone.Model.extend({
    defaults: {
        date: '',
        project: '',
        activity: '',
        timespent: '',
        description: ''
    },

    validate: function(attr, options) {
        var error = [];
        if (typeof attr.date !== Date) {
            error.push('Date must be valid');
        }
        if (typeof attr.activity !== typeof '' || typeof attr.project !== typeof '' || typeof attr.description !== typeof '') {
            error.push('Text must be string');
        }
        if (typeof attr.timespent !== Time) {
            error.push('Time should be valid');
        }
        if (error.length) {
            return error
        }
    }
});

var StatusList = Backbone.Collection.extend({
    model: Status
});

var Row = Backbone.View.extend({
    tagName: 'li',
    className: 'row',
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },

    render: function() {
        var date = this.model.get('date'),
            project = this.model.get('project'),
            activity = this.model.get('activity'),
            timespent = this.model.get('timespent'),
            description = this.model.get('description');

        var inputdate, inputdate, inputactivity, inputtime, inputdesc;

        inputdate = '<span>' + date + '</span><br>';
        inputproject = '<span>' + project + '</span><br>';
        inputactivity = '<span>' + activity + '</span><br>';
        inputtime = '<span>' + timespent + '</span><br>';
        inputdesc = '<span>' + description + '</span><br>';

        this.$el.html(inputdate + inputproject + inputactivity + inputtime + inputdesc);
        return this;
    },
});

var List = Backbone.View.extend({
    tagName: 'ul',
    className: 'list',

    initialize: function() {
        this.listenTo(this.collection, "add", this.render);
    },

    render: function() {
        var lastAdded = this.collection.last(),
            row;

        if (!!lastAdded) {
            row = new Row({ 'model': lastAdded });
            this.$el.append(row.render().$el);
        }

        return this;
    }
});

var Form = Backbone.View.extend({
    initialize: function() {

        this.textarea = $('<textarea rows="3" cols="5" class="textarea">');
    },

    events: {
        'click button': 'submit'
    },

    render: function() {
        this.$el.append(this.textarea);
        this.$el.append('<button>Save</button>');

        return this;
    },

    submit: function(event) {
        var mydate = $('#date').val();
        var myproject = $('#project').val();
        var myactivity = $('#activity').val();
        var mytime = $('#timespent').val();
        if ($.trim(this.textarea.val()) === '') {
            return;
        }

        this.collection.push({ date: mydate, project: myproject, activity: myactivity, timespent: mytime, description: this.textarea.val() });
        this.textarea.val('');
        this.textarea.focus();
    }
})
var c1 = new StatusList();
var list = new List({ collection: c1 });
var form = new Form({ collection: c1 });

$('.dom').append(list.render().$el);
$('.inputgrp').append(form.render().$el);
