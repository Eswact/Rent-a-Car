function getCarImage(filename) {
    return `http://localhost:3000/uploads/cars/${filename}`;
};

function getBrandLogo(filename) {
    return `http://localhost:3000/uploads/brands/${filename}`;
};

function convert2Price(value) {
    var str = value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    str = str.replace(/\./, "x");
    str = str.replace(/,/g, ".");
    str = str.replace(/x/, ",");
    return str + "₺";
}

export { getCarImage, getBrandLogo, convert2Price };