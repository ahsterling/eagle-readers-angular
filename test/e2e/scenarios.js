'use strict';

describe('eagleReadersApp', function() {

  describe('books index view', function() {

    beforeEach(function() {
      browser.get('/#/books');
    });

    it('should filter the book list as a user types in the search box', function() {
      var bookList = element.all(by.repeater('book in books'));

      var query = element(by.model('query'));

      expect(bookList.count()).toBe(3);

      query.sendKeys('harry');
      expect(bookList.count()).toBe(1);

      query.clear();
      query.sendKeys('lor');
      expect(bookList.count()).toBe(2);
    });

    it('should filter the book list as a user selects subject from drop down', function() {
      var bookList = element.all(by.repeater('book in books'));
      var subject = element(by.model('subject'));
      var dropdown = element(by.id('subject-dropdown'));
      expect(bookList.count()).toBe(3);

      element(by.cssContainingText('option', 'fiction')).click();

      expect(bookList.count()).toBe(2);


    })
  })

  describe('books show view', function() {
    beforeEach(function() {
      browser.get('/#/books/1');
    });

    it('should display book page', function() {
      expect(element(by.binding('title')).getText()).toBe('The Grapes of Wrath');
    });
  });

  describe('badges index view', function() {
    beforeEach(function() {
      browser.get('/#/badges');
    });

    it('should display badges list', function() {
      expect(element(by.binding('title')).getText()).toBe('Genre Explorer');
    });

    it('should filter genres as a user types in the search box', function() {
      var badgeList = element.all(by.repeater('badge in badges'));

      var query = element(by.model('query'));

      expect(badgeList.count()).toBe(3);

      query.sendKeys('genre');
      expect(badgeList.count()).toBe(1);

      query.clear();
      query.sendKeys('list');
      expect(badgeList.count()).toBe(1);

    });
  })

});
