/*
 * D15 - Daniel15 framework stuff :-)
 * Author: Daniel15 <dan.cx>
 */
 
// Various string functions
String.implement(
{
	/**
	 * Uppercase the first letter of the string
	 */
	ucfirst: function()
	{
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
});

var D15 = D15 || {};
/**
 * Onload handler for Daniel15 framework. Calls onload functions depending on the current page.
 * Splits the body ID by hyphen (-), uses first piece as the main object, and other pieces as 
 * sub-objects. Non-existant init methods are ignored (no error is thrown).
 *
 * Example: An ID of "site-projects" would call Site.init() and Site.Projects.init().
 * site-projects-foo would call Site.init(), Site.Projects.init() and Site.Foo.init().
 * "blog" would call Blog.init().
 *
 */
D15.onload = function()
{
	var id_pieces = document.body.id.split('-');
	// First piece is the main object
	var obj_name = id_pieces.shift().ucfirst();
	var obj = window[obj_name];
	// If we don't have the object, just die
	if (obj === undefined)
		return;
	
	// Call the object initialisation function
	obj.init && obj.init();
	// Go through each piece, and call the initialisation on it.
	id_pieces.each(function(piece)
	{
		piece = piece.ucfirst();
		obj[piece] && obj[piece].init && obj[piece].init();
	});
};

// Fire it up!
window.addEvent('domready', D15.onload);