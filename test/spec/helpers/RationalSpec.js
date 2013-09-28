define(["chai", "scripts/helpers/Rational"], function (chai, Rational) {

	var expect = chai.expect;

	describe("Rational", function () {
		var rational, rat1, rat2;

		beforeEach(function () {
			rational = new Rational(2, 3);
		});

		describe("getNumerator", function () {
			it("should have the getNumerator method", function () {
				expect(rational.getNumerator).to.be.ok;
			});
			it("should return the numerator", function () {
				expect(rational.getNumerator()).to.equal(2);
			});
		});

		describe("getDenominator", function () {
			it("should have the getDenominator method", function () {
				expect(rational.getDenominator).to.be.ok;
			});
			it("should return the denominator", function () {
				expect(rational.getDenominator()).to.equal(3);
			});
		});

		xdescribe("setNumerator", function () {
			it("should have the setNumerator method", function () {
				expect(rational.setNumerator).to.be.ok;
			});
			it("should set the numerator", function () {
				rational.setNumerator(4);
				expect(rational.getNumerator()).to.equal(4);
			});
		});

		xdescribe("setDenominator", function () {
			it("should have the setDenominator method", function () {
				expect(rational.setDenominator).to.be.ok;
			});
			it("should set the denominator", function () {
				rational.setDenominator(5);
				expect(rational.getDenominator()).to.equal(5);
			});
		});

		describe("Arithmatic", function () {
			describe("addition", function () {
				it("should have an add function", function () {
					expect(rational.add).to.be.ok;
				});
				it("should return a Rational", function () {
					expect(rational.add(new Rational())).to.be.instanceof(Rational);
				});
			});

			describe("subtraction", function () {
				it("should have a subtract function", function () {
					expect(rational.subtract).to.be.ok;
				});
				it("should return a Rational", function () {
					expect(rational.subtract(new Rational())).to.be.instanceof(Rational);
				});
			});

			describe("multiplication", function () {
				it("should have a mult function", function () {
					expect(rational.mult).to.be.ok;
				});
				it("should return a Rational", function () {
					expect(rational.mult(new Rational())).to.be.instanceof(Rational);
				});
				it("should return the correct values", function () {
					rat1 = new Rational(3, 4);
					rat2 = new Rational(5, 6);
					rational = rat1.mult(rat2);
					expect(rational.getNumerator()).to.equal(5);
					expect(rational.getDenominator()).to.equal(8);
				});
			});

			describe("division", function () {
				it("should have a div function", function () {
					expect(rational.div).to.be.ok;
				});
				it("should return a Rational", function () {
					expect(rational.div(new Rational())).to.be.instanceof(Rational);
				});
				it("should return the correct values", function () {
					rat1 = new Rational(3, 4);
					rat2 = new Rational(5, 6);
					rational = rat1.div(rat2);
					expect(rational.getNumerator()).to.equal(9);
					expect(rational.getDenominator()).to.equal(10);
				});
			});
		});

		describe("reduce", function () {
			it("should set the numerator and denominator to their lowest possible values", function () {
				expect(rational.reduce().toString()).to.equal("2/3");
				rational = new Rational(25, 100);
				expect(rational.reduce().toString()).to.equal("1/4");
			});
		});

		describe("toString", function () {
			it("should return the numerator over the denominator", function () {
				expect(rational.toString()).to.equal("2/3");
				rational = new Rational(25, 100);
				expect(rational.toString()).to.equal("25/100");
			});
		});

		describe("equals", function () {
			it("should return true if the ratio is the same", function () {
				var rat = new Rational(2, 3);
				expect(rational.equals(rat)).to.equal(true);
				rat = new Rational(4, 5);
				expect(rational.equals(rat)).to.equal(false);
			});
		});
	});
});