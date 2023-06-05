# Items browser
 
This is something from a long time ago, cleaned up a little, but still pretty basic.

There was a time wayback when I had about four e-commerce sites in progress, together with a site for a realtor, and it occurred to me that all five sites were basically the same, at least when it came to presenting lists of products/properties to the user, and allowing them to filter/sort them in various ways.

This was the result: a small Javascript app (using JQuery) that could be shared amongst all the projects. (Although I've replaced the JQuery AJAX with Axios, simply because I wanted to mess around with Axios.)

The original was a real mess as it grew, and as I iterated my way around the projects, adding the little bit here and the little bit there as required.

So this here the start of the process of tidying it all up, trying to streamline the whole thing.

## TODO

There’s a TODO in the Javascript file describing some of things that were implemented (or semi-implemented) in the original, so as time permits I’ll bring those features into this version here.

- A default template which is just a div with data JSON stringified inside
- Nominate a field name in data which can control selection of template from multiple named options
- Function to manually refresh data, or insert extra data from another source
- Control class names and id which is given to "wrapper" div for each instance derived from template
- Run multiple instances so that two or more lists can be browsed on the same page
- Callbacks into user code for template rendering etc allowing customisation
- Callback (or something) which renders into listing if there are no items
- Support for paging through large number of items
- Support for infinite scrolling

But for now, in the interests of simplicity, and in the interests of just getting going, I’ve left out all of the above.

As mentioned above, I’ve used Axios: https://axios-http.com

The project also uses JQuery (either full or slim): https://jquery.com

The project also works fine using Cash, a JQuery alternative: https://github.com/fabiospampinato/cash

