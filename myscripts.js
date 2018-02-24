

$(document).ready(function(){

  //Load the Menu, Project info from the JSON file
  loadDoc();

  //Set the focus of the drop down menu ////
  $(".downDrop").click(function(){ 
     setTimeout(function(){$('.focus0').focus();},10);
   // $('.focus').children().first().focus();
   //$(".focus li:first-child a").focus();
  });


  //Search
$("#mySearch").keyup(function(){

      search(this.value);

});

  //Load the Menu, Project info from the JSON file FUNCTION
  function loadDoc() {
     
        $.getJSON("projects.json", function(result){        
         var c, groupLength;

            for (x in result) {
                //Projects
                $("#dropList").append("<div class='mainFields'><div class='row'><div class='col-sm-3'><li><img src='" 
                  + result[x].image.link + "' class='img-responsive center-block'></li></div> <div class='col-sm-9'> <li> <a href='" 
                  + result[x].url + "' class = 'focus" + x + "'><b>" + result[x].name + 
                  "</b></a></li><div class='subNavDiv'><ul class='subNav' id ='subNav" 
                  + x + "'></ul></div></div></div><li role='separator' class='divider'></li></div>");
                  
                //Groups
                groupLength = result[x].groups.length;
              
                if(groupLength > 0){

                  for (c = 0; c < groupLength; c++) {
                    $("#subNav" + x).append("<li> <a href='" + result[x].groups[c].url + "''>" + 
                      result[x].groups[c].name + "</a></li>");
                  }
                }
              
              $("#subNav" + x).append("<div class='add'><li>+Add Group</li></div>");
            }

        });     
  }

//SEARCH FUNCTION to match the user input
function search(str){

  $(".mainFields").remove();

  if (str.length == 0){

    loadDoc();
  }
  else{

    str = str.toLowerCase();
    var strlen = str.length;
    $.getJSON("projects.json", function(result){
            
    var c, groupLength;

              //Projects
            for (x in result) {
                  
                  var projName = result[x].name;
                  projName = projName.toLowerCase();


                  if(projName.includes(str)){
                     var firstP = projName.indexOf(str);
                      var nameLenP = projName.length;
                      var tempP, nameFirstP;
                      
                      if (firstP > 0){
                          tempP = projName.substring(0, firstP);
                          nameFirstP = toUpper(tempP);
                          tempP = projName.substring(firstP + strlen, nameLenP);
                          var nameLastP = tempP;

                          $("#dropList").append("<div class='mainFields'><div class='row'><div class='col-sm-3'><li><img src='" 
                          + result[x].image.link + "' class='img-responsive center-block'></li></div> <div class='col-sm-9'> <li> <a href='" 
                          + result[x].url + "' class = 'focus" + x + "'><b>" + nameFirstP + "<span class='highlighted'>" 
                          + str + "</span>" + nameLastP + "</b></a></li><div class='subNavDiv'><ul class='subNav' id ='subNav" 
                          + x + "'></ul></div></div></div><li role='separator' class='divider'></li></div>");
                      }
                      else{
                            if(strlen > 1){
                                tempP = projName.substring(0, strlen);
                                nameFirstP = toUpper(tempP);
                                tempP = projName.substring(firstP + strlen, nameLenP);
                                var nameLastP = tempP;
                            }
                            else{
                              tempP = projName[0];
                              nameFirstP = toUpper(tempP);
                              tempP = projName.substring(firstP + strlen, nameLenP);
                              var nameLastP = tempP;
                            }

                          $("#dropList").append("<div class='mainFields'><div class='row'><div class='col-sm-3'><li><img src='" 
                          + result[x].image.link + "' class='img-responsive center-block'></li></div> <div class='col-sm-9'> <li> <a href='" 
                          + result[x].url + "' class = 'focus" + x + "'><b><span class='highlighted'>" 
                          + nameFirstP + "</span>" + nameLastP + "</b></a></li><div class='subNavDiv'><ul class='subNav' id ='subNav" 
                          + x + "'></ul></div></div></div><li role='separator' class='divider'></li></div>");
                      }
                  }
                  else{
                  $("#dropList").append("<div class='mainFields'><div class='row'><div class='col-sm-3'><li><img src='" 
                  + result[x].image.link + "' class='img-responsive center-block'></li></div> <div class='col-sm-9'> <li> <a href='" 
                  + result[x].url + "' class = 'focus" + x + "'><b>" 
                  + result[x].name + "</b></a></li><div class='subNavDiv'><ul class='subNav' id ='subNav" 
                  + x + "'></ul></div></div></div><li role='separator' class='divider'></li></div>");
                  
                  }

                //Groups
                groupLength = result[x].groups.length;

                if(groupLength > 0){

                  for (c = 0; c < groupLength; c++) {
                    var name = result[x].groups[c].name;
                    name = name.toLowerCase();
                      
                      if(name.includes(str)){
                        //name = result[x].groups[c].name;
                        var first = name.indexOf(str);
                        var nameLen = name.length;
                        var temp, nameFirst;

                        if (first > 0){
                          temp = name.substring(0, first);
                          nameFirst = toUpper(temp);
                          temp = name.substring(first + strlen, nameLen);
                          var nameLast = temp;
                          $("#subNav" + x).append("<li> <a href='" 
                        + result[x].groups[c].url + "'>" + nameFirst + "<span class='highlighted'>" 
                        + str + "</span>" + nameLast + "</a></li>");

                        }
                        else{
                            if(strlen > 1){
                              temp = name.substring(0, strlen);  
                              nameFirst = toUpper(temp);
                              temp = name.substring(first + strlen, nameLen);
                              var nameLast = temp;
                            }
                            else{
                              temp = name[0];
                              nameFirst = toUpper(temp);
                              temp = name.substring(first + strlen, nameLen);
                              var nameLast = temp;
                            }  
                              $("#subNav" + x).append("<li> <a href='" 
                            + result[x].groups[c].url + "'><span class='highlighted'>" 
                            + nameFirst + "</span>" + nameLast + "</a></li>");
                            
                        }
                      }
                  }

                }

            }
          
    });
  }

  setTimeout(function(){$('.focus0').focus();},10);
}


function toUpper(str){
  var sChar;
  var slength = str.length;
  if (slength > 0){
    sChar = str[0].toUpperCase();
    var newS = str.slice(1, slength);
    newS = sChar + newS;
    return newS;
  }
  else{

    return str.toUpperCase();
  }
}




}); ///////doc.ready

 


  <!--//TO TOP BUTTON-->

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

<!--//TO TOP BUTTON-->