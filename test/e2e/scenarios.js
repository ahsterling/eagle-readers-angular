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
    })
  })
})
