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
    element(by.model('shark.name')).clear().sendKeys('edited shark');
    element(by.model('shark.speed')).clear().sendKeys('edited speed');
    element(by.model('shark.preyPreference')).clear().sendKeys('edited prey');
    element(by.id('canceledit')).click();
    element(by.css('#sharklist li:first-child')).getText(function(text) {
      expect(text).toEqal('test shark is a shark with a speed of 60 who likes tests');
    });
  });
  it('should update a shark', function() {
    browser.get('http://localhost:5000');
    element(by.css('#sharklist li:first-child')).element(by.id('editshark')).click();
    element(by.model('shark.name')).clear().sendKeys('edited shark');
    element(by.model('shark.speed')).clear().sendKeys('edited speed');
    element(by.model('shark.preyPreference')).clear().sendKeys('edited prey');
    element(by.id('updateShark')).click();
    element(by.css('#sharklist li:first-child')).getText(function(text) {
      expect(text)
      .toEqal('edited shark is a shark with a speed of edited speed who likes edited prey');
    });
  });
  it('should delete a shark', function() {
    browser.get('http://localhost:5000');
    element(by.css('#sharklist li:first-child')).element(by.id('deleteshark')).click();
    element(by.css('#sharklist li:first-child')).getText(function(text) {
      expect(text).toEql(null);
    });
  });
});
