/*
 * Class for doing rational math.
 */
define([], function () {

	var Rational = function (numerator, denominator) {

		this.numerator = numerator;

		this.denominator = denominator;

		this.getNumerator = function () {
			return this.numerator;
		};

		this.getDenominator = function () {
			return this.denominator;
		};

		this.add = function (rat) {
			var result = new Rational();

			return result;
		};

		this.subtract = function (rat) {
			var result = new Rational();

			return result;
		};

		this.mult = function (rat) {

			var num = this.numerator * rat.getNumerator();
			var den = this.denominator * rat.getDenominator();
			
			return new Rational(num, den).reduce();
		};

		this.div = function (rat) {

			var num = this.numerator * rat.getDenominator();
			var den = this.denominator * rat.getNumerator();

			return new Rational(num, den).reduce();
		}

		this.reduce = function () {
			var gcd = this.gcd(numerator, denominator)
			this.numerator = this.numerator / gcd;
			this.denominator = this.denominator / gcd;

			return this; // should this instead return a new Rational?
		};

		this.equals = function (rat) {
			return (this.getNumerator() === rat.getNumerator() && this.getDenominator() === rat.getDenominator());
		};

		this.toNumber = function () {
			return this.getNumerator() / this.getDenominator();
		};

		this.toString = function () {
			return "" + this.getNumerator() + "/" + this.getDenominator();
		};

		this.gcd = function (a, b) {
			return b ? this.gcd(b, a%b) : a;
		}
	}
	return Rational;
});
