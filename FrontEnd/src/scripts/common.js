import { fetchData } from '../scripts/ajax.js'

const getDetailsPage = (router, carId) => {
    router.push({ path: `/detail/${carId}` });
};

function setlocalstorage(tmpname, tmpvalue) {
    window.localStorage.setItem(tmpname, encodeURIComponent(tmpvalue));
}
function getlocalstorage(tmpname) {
    var tmp_dbvalue = "";
    tmp_dbvalue = decodeURIComponent(window.localStorage.getItem(tmpname));
    if (tmp_dbvalue == "null") {
        tmp_dbvalue = "";
    }
    return tmp_dbvalue;
}

var brandList;
fetchData(`brands/published`, 
    async (data) => {
        brandList = data;
    },
    (error) => {
        console.error('Bir hata oluştu:', error);
    }
);
var categoryList;
fetchData(`categories/published`, 
    async (data) => {
        categoryList = data;
    },
    (error) => {
        console.error('Bir hata oluştu:', error);
    }
);

function getCarImage(filename) {
    return `http://localhost:3000/uploads/cars/${filename}`;
};

function getBrand (brandId) {
    const brand = brandList.find(x => x.brandId === brandId);
    return brand
    ? {
        logo: `http://localhost:3000/uploads/brands/${brand.logo}`,
        name: brand.name,
      }
    : null;
};

function getCategory (catId) {
    const category = categoryList.find(x => x.catId === catId);
    return category
    ? category.name
    : null;
};

function getBrandImage(filename) {
    return `http://localhost:3000/uploads/brands/${filename}`;
}

function getCompanyImage(filename) {
    return `http://localhost:3000/uploads/company/${filename}`;
};

function getBannerImage(filename) {
    return `http://localhost:3000/uploads/banners/${filename}`;
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

export { getDetailsPage, setlocalstorage, getlocalstorage, getCarImage, getBrand, getCategory, getBrandImage, getCompanyImage, getBannerImage, convert2Price };