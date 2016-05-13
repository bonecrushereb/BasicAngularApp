describe('then app', function() {
  it('should create a shark', function() {
    browser.get('http://localhost:5000');
    element(by.model('sharksctrl.newShark.name')).sendKeys('test shark');
    element(by.model('sharksctrl.newShark.preyPreference')).sendKeys('tests');
    element(by.id('createShark')).click();
    element(by.css('#sharklist li:first-child')).getText(function(text) {
      expect(text).toEqal('test shark is a shark with a speed of 60 who likes tests');
    });
  });
  it('should cancel an update of a shark', function() {
    browser.get('http://localhost:5000');
    element(by.css('#sharklist li:first-child')).element(by.id('editshark')).click();
    element(by.model('shark.name')).sendKeys('edited shark');
    element(by.model('shark.preyPreference')).sendKeys('edited prey');
    element(by.id('canceledit')).click();
    element(by.css('#sharklist li:first-child')).getText(function(text) {
      expect(text).toEqal('test shark is a shark with a speed of 60 who likes tests');
    });
  });
  it('should update a shark', function() {
    browser.get('http://localhost:5000');
    element(by.css('#sharklist li:first-child')).element(by.id('editshark')).click();
    element(by.model('shark.name')).sendKeys('edited shark');
    element(by.model('shark.speed')).sendKeys('40');
    element(by.model('shark.preyPreference')).sendKeys('edited prey');
  });
});
