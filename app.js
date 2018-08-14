// Created by Vince Chang
$(function() {
    // Collection Data
    var jobs =[
      {
        "job-title": "Front End Software Engineer, Architecture & Platform",
        "job-description": "The Front End Engineer is accountable and " +
        "responsible for supporting the Macys.com Creative Release process. " +
        "This individual will collaborate with a larger team of engineers, " +
        "designers, and producers to develop experiences designed to support " +
        "Macys.com marketing and sales initiatives. The team is dynamic and " +
        "fast paced, supporting a weekly release cycle. The ideal candidate " +
        "must be able to thrive in an environment where change is constant. " +
        "This position requires the need to be extremely organized, highly " +
        "collaborative, and results-driven. Individuals need to take " +
        "initiative and reach out to other team members when they need " +
        "assistance. Likewise, the Front End Engineer will need to be " +
        "available and willing to assist other engineers and team mates when " +
        "they need help. Verbal and written communication skills are key here."+
        " Perform other duties as assigned."
      },
      {
        "job-title": "UI Architect (macys.com)",
        "job-description": "An Architect is a senior technologist who " +
        "designs and implements application architecture and owns the " +
        "application strategies and roadmap for a suite of systems or " +
        "domains. Their primary areas of focus are core development, design " +
        "and direction of application architecture and alignment of " +
        "architecture with business objectives and high-level company " +
        "technology direction. The UI Architect will partner with other " +
        "architects and technology decision-makers to guide overall " +
        "direction of the user interface layer of the site. He/she will work " +
        "closely with Technical Leads, Application Architects, Software " +
        "Developers and Management in a highly collaborative environment. " +
        "Perform other duties as assigned."
      }
    ];

    // Create a Backbone Model
    var JobFormModel = Backbone.Model.extend({});

    // Create a Backbone Collection that holds different models === (job apps)
    var JobFormCollection = Backbone.Collection.extend({
      model: JobFormModel
    });

    // Create a new instance of that collection
    var jobFormCollection = new JobFormCollection(jobs);

    // Create a Backbone View to go with the Model
    var JobFormView = Backbone.View.extend({
      tagName: "div",

      // This will happen automatically
      initialize: function(){
        this.render();
      },
      render: function(){
        // Using jquery and handlebars to recognize the template I placed in
        // my index.html file and dumps it into the div
        var source = $('#job-template').html();
        var template = Handlebars.compile(source);
        var html = template(this.model.toJSON());
        this.$el.html(html);
        return this;
      }
    });

    // Create a new View that will call the individual view for each job
    var MainView = Backbone.View.extend({
      // This is where to append the different jobs
      el: ".big-container",

      render: function(){
        // Iterate through the collection and call JobFormView to display jobs
        // For each job, append the new view to the "big-container div"
        this.collection.each((job) => {
          let view = new JobFormView({model:job});
          this.$el.append(view.render().el);
        });
        return this;
      }
    });

    // Create a new instance of the mainView and watch the magic happen!
    var mainView = new MainView({
      collection: jobFormCollection
    });

    // Call the mainView's render()
    mainView.render();
});