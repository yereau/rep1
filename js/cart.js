
var cartArray = [];
let subTotal = 200;
window.sessionStorage.setItem("subTotal",subTotal)

function showProductCart1(array){
 
    let htmlContentToAppend = "";
   
    let total1 = array[0].unitCost*2;
        

        htmlContentToAppend += `

        <a  class="list-group-item  prod" style="height: 207px;">
        <div class="row" >
            <div class="col-3">
                <img src="` + array[0].src + `"  class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1 filt" style="color: black;" >`+ array[0].name +" "+ array[0].currency + " " + "<span id='cost1'>"+ array[0].unitCost +"</span>" +`</h4>
                    <h4> SubTotal </h4>
                </div>
                <br>
                    <div class="d-flex w-100 justify-content-between">
                        <div>
                        <span>Cantidad</span>
                        <input type="number"  class="butt" id="cant1" value=2 onclick="return costeEnvio()"> 
                        </div>            
                        
                        <h5>` + array[0].currency + "<span id='total1'>"+ total1 +"</span>" + `</h5>
                    </div>
            </div>
        </div>
        </a>     `
    
        document.getElementById("cart-prod1").innerHTML = htmlContentToAppend;
}

function cantidadPrecio(){

    let cantidad = parseInt(document.getElementById("cant1").value);
    let precio = parseInt(document.getElementById("cost1").textContent);
    let subTotal = precio*cantidad;
    document.getElementById("total1").innerHTML = subTotal;
    window.sessionStorage.setItem("subTotal",subTotal)
}
    
function costeEnvio(){
let costo = parseInt(sessionStorage.getItem("subTotal"));
let costoI = parseInt(document.getElementById("tipoEnvio").value);
let costoEnvio = costoI * costo / 100 ;
let total = costoEnvio + costo ;
document.getElementById("totalE").innerHTML = costoEnvio;
document.getElementById("totalF").innerHTML = total;
}
    
function formaPago(){
    let pagoT = document.getElementById("tarjeta").checked;
    let pagoB = document.getElementById("banco").checked;
   
        
        let htmlContentToAppend1 = "";

        htmlContentToAppend1 += ` 
        <a  class="  prod" >
        <div class="row" >
            
                    <div class="d-flex w-100 justify-content-between">
                        <div>
                        <p> <span class="gif textblue">Pago a acordar con el vendedor </span>
                        
                        </div>            
                        
                    </div>
        </div>
        </a>  
        `
    
        if( pagoT == true ){
        document.getElementById("tipoPago").innerHTML = htmlContentToAppend;
        document.getElementById("tipoPago2").innerHTML = "";
    }
    else if (pagoB == true){
    document.getElementById("tipoPago2").innerHTML = htmlContentToAppend1;
    document.getElementById("tipoPago").innerHTML = ""

}else {
    document.getElementById("tipoPago2").innerHTML = "";
    document.getElementById("tipoPago").innerHTML = ""
}

}
function comprado(){
    window.alert('Compra exitosa');

    
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData( CART_INFO2_URL).then(function(resultCom){
        if (resultCom.status === "ok")
        {
            cartArray = resultCom.data;
            //Muestro los comentarios ordenados
            showProductCart1(cartArray["articles"]);
           
           document.getElementById("cant1").addEventListener("change", function(e){
            cantidadPrecio()
           })
           costeEnvio()
        }                                                
    });

});
