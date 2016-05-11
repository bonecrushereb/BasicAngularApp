describe('the angular app', function() {
  it('should have a two way data binding', function() {
    browser.get('http://localhost:5000');

    element(by.model('greeting')).sendKeys('hello world');
    element(by.id('greeting')).getText().then(function(text) {

      expect(text).toEqual('hello world');
    });
  });
});
