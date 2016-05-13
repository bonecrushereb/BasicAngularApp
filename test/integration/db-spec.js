describe('then app', function() {
  it('should create a shark', function() {
    element(by.model('sharksctrl.newShark.name')).sendKeys('test shark');
    element(by.id('createShark')).click();
    element(by.css('#sharkList:first-child')).getText(function(text) {
      expect(text).toEqal('test shark is a shark with a speed of 60 who likes tests');
    });
  });
});
