var categoriesArray = [];
var comentsArray = [];

function showProductInfo(array){

    let htmlContentToAppend = "";

        htmlContentToAppend += `
    
            <div >

                <div class="row" >
                    <h4 class="mb-1">`+ array.name +`</h4>
                </div>

                     <hr>

                     <div>
                          <p Style="font-weight: bold; margin-bottom: 0px" > Precio </p>
                          <p >`+ array.currency + " " + array.cost +`</p>
                      </div>

                             <div>
                                 <p Style="font-weight: bold; margin-bottom: 0px" > Descripción </p>
                                 <p >`+ array.description +`</p>
                             </div>

                                    <div>
                                        <p Style="font-weight: bold; margin-bottom: 0px" > Categoría </p>
                                        <p><a href="category-info.html"> Autos </a></p>
                                    </div>

                                        <div>
                                            <p Style="font-weight: bold; margin-bottom: 0px" > Cantidad de vendidos </p>
                                            <p >`+ array.soldCount +`</p>
                                        </div>

                                            <div >
                                                <p Style="font-weight: bold; margin-bottom: 0px" > Imágenes ilustrativas </p>

                                                    <table border="0" >
                                                        <tr>
                                                            <td><img src="` + array.images[0] + `" alt="` + array.description + `" class="img-thumbnail"></td>
                                                            <td><img src="` + array.images[1] + `" alt="` + array.description + `" class="img-thumbnail"></td>
                                                            <td><img src="` + array.images[2] + `" alt="` + array.description + `" class="img-thumbnail"></td>
                                                            <td><img src="` + array.images[3] + `" alt="` + array.description + `" class="img-thumbnail"></td>
                                                        </tr>

                                                        <tr> 
                                                            <td><img src="` + array.images[4] + `" alt="` + array.description + `" class="img-thumbnail"></td>
                                                        </tr>
                                                    </table>
                                            </div>

                                                <div>
                                                    <p Style="font-weight: bold;margin-top: 7px " > Comentarios </p>
                                                </div>

             </div>
        `

        document.getElementById("prod-info").innerHTML = htmlContentToAppend;
    
}


function showProductComent(array){
 
    let fechaHora = sessionStorage.getItem("dateTime");
    let opi = sessionStorage.getItem("description"); 
    let estrellas = JSON.parse( sessionStorage.getItem("star"));
    let name = sessionStorage.getItem("user");
    if(opi != null){
       let newcoment = {score: estrellas , description: opi , user: name , dateTime: fechaHora};
        comentsArray.push(newcoment);
    }else{
        delete comentsArray[4];
     
}
    



    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let comen = array[i];
        
       

        var star = "";
        for(let s = 1; s <= comen.score; s++){
            star = star + ' <span class="fa fa-star checked"></span> ' ;
        }
        for(let s = comen.score+1; s <= 5; s++){
            star = star + ' <span class="fa fa-star "></span> ' ;
        }

        htmlContentToAppend += `

        <div>
            <div class="list-group-item ">
                
                <div>
                    <p > <span style="font-weight: bold;"> `+ comen.user + ` </span> `+ " - " + comen.dateTime + " - "  + star +` </p>
                    <p> `+ comen.description + ` </p>
                </div>    
                
           </div>

           </div>
           
        `
    }
        document.getElementById("coments").innerHTML = htmlContentToAppend;
    
}

function comentar(){

    let opinionnew=document.getElementById("opinion").value;
    let time = new Date();

    if (opinionnew=="") {

        return false;
      }
      else{

        window.sessionStorage.setItem("description", opinionnew);
        window.sessionStorage.setItem("dateTime", time);

       // comen.push(comm);
         // showcoments(comen);
    
 
      
      
    }
}





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductInfo(categoriesArray);
        }
    });
    getJSONData( PRODUCT_INFO_COMMENTS_URL).then(function(resultCom){
        if (resultCom.status === "ok")
        {
            comentsArray = resultCom.data;
            //Muestro los comentarios ordenados
            showProductComent(comentsArray);
           
        }


//linea para mostrar JSON en consola
        var v = resultCom.data
        console.log(v)




    });
    document.getElementById("radio1").addEventListener("click", function(){
        let pun="";
            pun= 5 ;


            window.sessionStorage.setItem("star", pun)

    });
    document.getElementById("radio2").addEventListener("click", function(){
        let pun="";
            pun= 4 ;
        
        
            window.sessionStorage.setItem("star", pun)
        
    });
    document.getElementById("radio3").addEventListener("click", function(){
        let pun="";
            pun= 3 ;
                
                
            window.sessionStorage.setItem("star", pun)
                
    });
    document.getElementById("radio4").addEventListener("click", function(){
        let pun="";
            pun= 2 ;
                
                
            window.sessionStorage.setItem("star", pun)
                
    });
    document.getElementById("radio5").addEventListener("click", function(){
        let pun="";
            pun= 1 ;
                
                
            window.sessionStorage.setItem("star", pun)
                
    });
//linea para mostrar sessionStorage en consola
    console.log(sessionStorage);
    
});