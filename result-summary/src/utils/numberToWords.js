function numberToWords(number) {
    const units = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten"
    ];
    const teens = [
        "",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen"
    ];
    const tens = [
        "",
        "Ten",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety"
    ];
    const thousands = ["", "Thousand", "Million", "Billion"];

    function convertChunk(num) {
        if (num === 0) {
            return "";
        } else if (num <= 10) {
            return units[num];
        } else if (num < 20) {
            return teens[num - 10];
        } else if (num < 100) {
            return tens[Math.floor(num / 10)] + " " + convertChunk(num % 10);
        } else {
            return (
                units[Math.floor(num / 100)] +
                " Hundred and " +
                convertChunk(num % 100)
            );
        }
    }

    if (number === 0) {
        return "Zero";
    }

    let words = "";
    let chunkIndex = 0;

    while (number > 0) {
        if (number % 1000 !== 0) {
            let chunk = convertChunk(number % 1000);
			console.log(chunk);
            if (chunk !== "") {
                if (words !== "") {
                    words = chunk + " " + thousands[chunkIndex] + (words.includes("and") ? ", " : " and ") + words;
                } else {
                    words = chunk + " " + thousands[chunkIndex];
                }
            }
        }
        number = Math.floor(number / 1000);
        chunkIndex++;
    }

    return words.trim();
}


export default numberToWords;
