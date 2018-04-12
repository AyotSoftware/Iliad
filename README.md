Iliad
=====
When looking at blogging software and websites that host blogs, I am surprised at the lack 
of sophistication in the software and the lack of facilities it can provide. You may have to
pay for hosting the blog itelf, but then again for adequate commenting facilities and 
mail list support. 
 
When it comes to typesetting, only the basics are available, with little support for eg
small caps, dropped caps and superscripts, all of which are useful from time to time. Some
blogging apps, despite their claims, do not even manage to provide full WYSIWYG editing and
make no attempt for the editor to use the blog's visual theme.
  
Further, the most established software out there - WordPress - is still based on PHP which
I regard as an outdated medium, especially for complex application, although one has to 
admit that it is widely supported by hosting companies.

So I'm looking to build my own, modern,  software - Iliad - that provides support for all
these things.

Design
------
The user interface must be fully responsive with full editing and admin available on all
devices.

The UI is customisable through the admin interface, avoiding the need to create and upload
CSS files. Fonts can be chosen from Google Fonts; the menu (structured in the admin 
interface) can be horizontal or vertical at the touch of a button. Paragraph indents,
fonts for styles, etc are all customised through admin with full preview in the browser
and through a simulation of a phone and a tablet. Different layouts can be chosen for
different devices.

Different layouts are available for the "list of articles" pages:
* a simple list
* a grid

Articles can be "featured" and the number of featured articles shown at the top of the 
list can be controlled (it will show the *n* most recent featured articles).

We introduce the concept of the "edition" in addition to the normal sequential blog.
This allows a series of articles to be gathered together into a single edition, published 
all at the same time, similar to the way a magazine works.

Thus this can be used to publish a simple blog, a magazine, newspaper, etc.

The blog's owner can choose whether the landing page is the article list or the
latest posting.

The server will not accept HTML blogs; it will assume that they are in our enhanced 
version of Markdown. This removes the risk of malicious code being present in an article;
except within an embedded section, which is sandboxed. Editing will be WYSWIG and not 
directly as Markdown - Google Docs shows that this is possible on a phone.

Installation and Admin
----------------------
Installation must be a simple one-liner through NPM, requiring no additional tools (other
than those packaged within the app). 

THe system must support horizontal scalability within a cloud infrastructure.

The sys admin - specified on first startup by use of a code issued during installation -
can create multiple blogs. Multiple people can have rights to create, edit, comment and 
moderate a blog; an article can have multiple authors, all of whom can edit it. 

In future versions
we could add the option to include a publication workflow so that an article must go
past various people's approval before it can be published.  This would need the ability
for a reviewer to add "review comments" to the article (custom Markdown extension), and for ad-hoc roles to be
created. Adding this facility would extend the functionality to eg an academic journal. 

Any "embeds" such as YouTube videos have to be in an `iframe` that is thoroughly sandboxed
to ensure that their access is restricted.

Hosting
-------
This is designed to allow multiple blogs to be created by the sys admin, and for them
to be edited by multiple people. We can easily turn this into a hosted blog service by
adding a paywall layer and invoking the "create blog" function as a service. The paywall 
would allow differing levels of service depending on the fee:
* Basic blog, no customisation
* Basic level of visual customistaion eg fonts, backgrounds etc
* Full customistion plus domain name and ability to alias domain
* Multi-user blog.

