describe("Durations. ", function() {

    it("formats hour durations", function() {
    	var result = parse("11 -> 12")
        expect(result).toEqual("01:00");
    });

    it("formats hour durations with strict zeroes", function() {
    	var result = parse("11:00 -> 12:00")
        expect(result).toEqual("01:00");
    });

    it("formats hour and minute durations", function() {
    	var result = parse("11:00 -> 11:30")
        expect(result).toEqual("00:30");
    });

    it("formats long hour and minute", function() {
    	var result = parse("11:00 -> 13:30")
        expect(result).toEqual("02:30");
    });

});

describe("Sums. ", function() {
	it("formats two times", function() {
		var result = parse("12:30 + 01:15");
		expect(result).toEqual("13:45")
	});
});

describe("Sums durations. ", function() {
	it("Does simple combined durations.", function() {
		var result = parse("08:30 -> 12:30 + 14:00 -> 17:00");
		expect(result).toEqual("07:00");
	});
});