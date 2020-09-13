const ORDER_ASC_BY_PRECIO = "PrecioA";
const ORDER_DES_BY_PRECIO = "PrecioD";
const ORDER_BY_PROD_REL = "Rel.";
var currentProductsArray = [];
var currentSortCriteriap = undefined;
var minPrec = undefined;
var maxPrec = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRECIO){   

        result = array.sort(function(a, b) {
            let acost = parseInt(a.cost);
            let bcost = parseInt(b.cost);

            if ( acost < bcost ){ return -1; }
            if ( acost > bcost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DES_BY_PRECIO){   

        result = array.sort(function(a, b) {
            let acost = parseInt(a.cost);
            let bcost = parseInt(b.cost);

            if ( acost > bcost ){ return -1; }
            if ( acost < bcost ){ return 1; }
            return 0;
        });
    }
    else if (criteria === ORDER_BY_PROD_REL){

        result = array.sort(function(a, b) {
            let aRel = parseInt(a.soldCount);
            let bRel = parseInt(b.soldCount);

            if ( aRel > bRel ){ return -1; }
            if ( aRel < bRel ){ return 1; }
            return 0;
        });
    }

    return result;
}



function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];

        if (((minPrec == undefined) || (minPrec != undefined && parseInt(products.cost) >= minPrec)) &&
            ((maxPrec == undefined) || (maxPrec != undefined && parseInt(products.cost) <= maxPrec))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action prod">
                <div class="row" >
                    <div class="col-3">
                        <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1 filt">`+ products.name +" "+ products.currency+products.cost+`</h4>
                            <small class="text-muted">` + products.soldCount + ` Vendidos</small>
                        </div>
                        <p class="mb-1 filt">` + products.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, productsArray){
    currentSortCriteriap = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteriap, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

function search(){

    var  texto = document.getElementById('box').value.toUpperCase();
    var productos = document.getElementsByClassName('prod');


    for (i = 0; i < productos.length; i++) {
     var txt= productos[i].getElementsByClassName("filt");
     var sumtxt = txt[0].textContent.toUpperCase() + txt[1].textContent.toUpperCase();

       
        if (sumtxt.indexOf(texto) > -1) {
          productos[i].style.display = "";
        } else {
          productos[i].style.display = "none";
        }
      }
    


}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_PRECIO, resultObj.data);
        }
    });

    document.getElementById("sortAs").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRECIO);
    });

    document.getElementById("sortDes").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DES_BY_PRECIO);
    });


    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minPrec = undefined;
        maxPrec = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrec = document.getElementById("rangeFilterCountMin").value;
        maxPrec = document.getElementById("rangeFilterCountMax").value;

        if ((minPrec != undefined) && (minPrec != "") && (parseInt(minPrec)) >= 0){
            minPrec = parseInt(minPrec);
        }
        else{
            minPrec = undefined;
        }

        if ((maxPrec != undefined) && (maxPrec != "") && (parseInt(maxPrec)) >= 0){
            maxPrec = parseInt(maxPrec);
        }
        else{
            maxPrec = undefined;
        }

        showProductsList();
    });
});