import { fetchData } from '../scripts/ajax.js'

var brandList;
fetchData(`brands/published`, 
    async (data) => {
        brandList = data;
    },
    (error) => {
        console.error('Bir hata oluştu:', error);
    }
);

function getCarImage(filename) {
    return `http://localhost:3000/uploads/cars/${filename}`;
};

function getBrandLogo (brandId) {
    const brand = brandList.find(x => x.brandId === brandId);
    return brand
    ? {
        logo: `http://localhost:3000/uploads/brands/${brand.logo}`,
        name: brand.name,
      }
    : null;
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