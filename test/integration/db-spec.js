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
    element(by.id('sharkcanceledit')).click();
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
    element(by.css('#sharklist')).getText(function(text) {
      expect(text).toEql(null);
    });
  });
  it('should create a prey', function() {
    browser.get('http://localhost:5000');
    element(by.model('preysctrl.newPrey.name')).sendKeys('test prey');
    element(by.model('preysctrl.newPrey.speed')).sendKeys('test speed');
    element(by.id('createPrey')).click();
    element(by.css('#preylist li:first-child')).getText(function(text) {
      expect(text).toEqal('test prey has a speed of test speed');
    });
  });
  it('should cancel an update of a prey', function() {
    browser.get('http://localhost:5000');
    element(by.css('#preylist li:first-child')).element(by.id('editprey')).click();
    element(by.model('prey.name')).clear().sendKeys('edited prey');
    element(by.model('prey.speed')).clear().sendKeys('edited speed');
    element(by.id('preycanceledit')).click();
    element(by.css('#preylist li:first-child')).getText(function(text) {
      expect(text).toEqal('test prey has a speed of test speed');
    });
  });
  it('should update a prey', function() {
    browser.get('http://localhost:5000');
    element(by.css('#preylist li:first-child')).element(by.id('editprey')).click();
    element(by.model('prey.name')).clear().sendKeys('edited prey');
    element(by.model('prey.speed')).clear().sendKeys('edited speed');
    element(by.id('updatePrey')).click();
    element(by.css('#preylist li:first-child')).getText(function(text) {
      expect(text)
      .toEqal('edited prey has a speed of edited speed');
    });
  });
  it('should kill a prey', function() {
    browser.get('http://localhost:5000');
    element(by.css('#preylist li:first-child')).element(by.id('deleteprey')).click();
    element(by.css('#preylist')).getText(function(text) {
      expect(text).toEql(null);
    });
  });
});
