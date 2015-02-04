'use strict';

describe('eagleReadersApp', function() {

  describe('books index view', function() {

    beforeEach(function() {
      browser.get('/#/books');
    });

    it('should perform a search for books by title', function() {
      var bookList = element.all(by.repeater('book in books'));

      var query = element(by.model('search.title'));
      var queryAuthor = element(by.model('search.author'));
      var submit = element(by.id('submit-search'));
      expect(bookList.count()).toBe(0);

      query.sendKeys('charlie');
      submit.click();
      expect(bookList.count()).toBe(12);

      browser.get('/#/books');
      query.clear();
      queryAuthor.sendKeys('sterling');
      submit.click();
      expect(bookList.count()).toBe(2);
    });


    it('should filter the book list as a user selects subject from drop down', function() {
      var bookList = element.all(by.repeater('book in books'));
      var subject = element(by.model('search.subject'));
      var dropdown = element(by.id('subject-dropdown'));
      var submit = element(by.id('submit-search'));

      expect(bookList.count()).toBe(0);

      element(by.cssContainingText('option', 'Volcanoes')).click();
      submit.click();
      expect(bookList.count()).toBe(3);


    })
  })

  describe('books show view', function() {
    beforeEach(function() {
      browser.get('/#/books/1');
    });

    it('should display book page', function() {
      expect(element(by.binding('title')).getText()).toBe('Volcano : the eruption and healing of Mount St. Helens / Add it!');
    });
  });

  describe('badges index view', function() {
    beforeEach(function() {
      browser.get('/#/badges');
    });

    it('should display badges list', function() {
      expect(element(by.binding('genre_name')).getText()).toBe('Animals');
    });

    it('should filter genres as a user types in the search box', function() {
      var badgeList = element.all(by.repeater('badge in badges'));

      var query = element(by.model('query'));

      expect(badgeList.count()).toBe(10);

      query.sendKeys('graph');
      expect(badgeList.count()).toBe(2);

      query.clear();
      query.sendKeys('ani');
      expect(badgeList.count()).toBe(1);

    });
  })

});
