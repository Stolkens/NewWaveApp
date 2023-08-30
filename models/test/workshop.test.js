const expect = require("chai").expect;
const Workshops = require('../worshops.model');

describe("Workshops", () => {
  it('should throw an error if no  args', () => {
    const dep = new Workshops({}); // create new Workshops, but don't set args values

    dep.validate((err) => {
      expect(err.errors.name, err.errors.concertId).to.exist;
    });
  });
  it('should throw an error if args are not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Workshops({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
    for (let concertId of cases) {
      const dep = new Workshops({ concertId });

      dep.validate((err) => {
        expect(err.errors.concertId).to.exist;
      });
    }

  });
  it('should not throw an error if args are okey', () => {
    const dep = new Workshops({ name: "New test", concertId: "64e47169749cda6c4c8a1c58" });
    dep.validate((err) => {
      expect(err).to.not.exist;
    });
  });
});