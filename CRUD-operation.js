const datalist = JSON.parse(localStorage.getItem("datalist"));


function collectData(){
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const address = document.getElementById("address").value;
    const gender = getGender();
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const hobby = getHobby();

    // dataarray = [];
    const persondata = {
        Firstname:firstname,
        Lastname:lastname,
        Address:address,
        Gender:gender,
        Email:email,
        Password:pass,
        Hobby:hobby
    };

    // dataarray.push(persondata);
    
    return persondata;
    
}

function submit(){

    let erro = errorCheck();
    if(erro == true){
        validate();
    }
    else{
        let person = collectData();
        console.log(datalist);
        datalist.push(person);
        localStorage.setItem("datalist", JSON.stringify(datalist));

        addRow();
        reset();
        
    }
}

function getGender(){
        var gen = document.getElementsByName('gender');   
        for(i = 0; i < gen.length; i++) {
            if(gen[i].checked)
                return gen[i].value;
    }
}

function getHobby(){
    var hby = document.getElementsByName('hobby');
    hbylist = [];  
    for(i in hby){
        if(hby[i].checked)
            hbylist.push(hby[i].value);
    }
    return hbylist;

}

function addRow(){

    let rowd = '';
    for(i in datalist){
         rowd += "<tr><th scope='row'>" + (Number(i)+1) + "</td><td>" + datalist[i].Firstname + "</td><td>" + datalist[i].Lastname + "</td><td>" + datalist[i].Address + "</td><td>" + datalist[i].Gender + "</td><td>" + datalist[i].Email + "</td><td>" + datalist[i].Password + "</td><td>" + datalist[i].Hobby + "</td><td><button  onclick='editRow("+i+")'> Edit </button> <button onclick='deleteRow("+i+")'>Delete</button>";
    }
    document.getElementById("tabledata").innerHTML = rowd;
}

function reset(){

    displayNone();

    document.getElementById("firstname").value = '';
    document.getElementById("lastname").value = '';
    document.getElementById("address").value = '';
    document.getElementById("email").value = '';
    document.getElementById("password").value = '';
    document.getElementById("male").checked = false;
    document.getElementById("female").checked = false;
    document.getElementById("other").checked = false;
    document.getElementById("cricket").checked = false;
    document.getElementById("music").checked = false;
    document.getElementById("traveling").checked = false;

    // var inputs = document.querySelectorAll('.h1');
    //     for (var i = 0; i < inputs.length; i++) {
    //         inputs[i].checked = false;
    //     }
    
}

function deleteRow(n) {  
    var storagedata = JSON.parse(localStorage.getItem("datalist"));
    storagedata.splice(n,1);

    datalist.splice(n,1);

    localStorage.setItem("datalist",JSON.stringify(storagedata));
    addRow();

    document.getElementById("submitbtn").innerHTML = "<button onclick='submit()'>Submit</button>";
    
    
    reset();
}

function editRow(i){

    document.getElementById("firstname").value = datalist[i].Firstname;
    document.getElementById("lastname").value = datalist[i].Lastname;
    document.getElementById("address").value = datalist[i].Address;
    document.getElementById("email").value = datalist[i].Email;
    document.getElementById("password").value = datalist[i].Password;

    const gen = datalist[i].Gender;
    if(gen == "Male")
        document.getElementById("male").checked = true;
    else if(gen == "Female")
        document.getElementById("female").checked = true;
    else if(gen == "Other")
        document.getElementById("other").checked = true;

    const hob = datalist[i].Hobby;
    for(j in hob){
        if(hob[j] == 'Cricket')
            document.getElementById("cricket").checked = true;
        else if(hob[j] == 'Music')
            document.getElementById("music").checked = true;
        else if(hob[j] == 'Traveling')
            document.getElementById("traveling").checked = true;
    }

    
    document.getElementById("submitbtn").innerHTML = "<button onclick='updateData("+ i +")'>Confirm</button>";
}

function updateData(i){

    let erro = errorCheck();
    console.log(erro);
    if(erro == true){
        validate();
    }
    else{
        let person = collectData();
        var storagedata = JSON.parse(localStorage.getItem("datalist"));
        storagedata.splice(i,1,person);

        datalist.splice(i,1,person);

        localStorage.setItem("datalist",JSON.stringify(storagedata));
        addRow();
        reset();
    
        document.getElementById("submitbtn").innerHTML = "<button onclick='submit()'>Submit</button>";
        displayNone();
    }
}

function errorCheck(){
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let address = document.getElementById("address").value;
    let male = document.getElementById("male").checked;
    let female = document.getElementById("female").checked;
    let other = document.getElementById("other").checked;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let cricket = document.getElementById("cricket").checked;
    let music = document.getElementById("music").checked;
    let travel = document.getElementById("traveling").checked;

    let errorOccur = false;
    if(firstname == '' || lastname == '' || address == '' || !(male == true || female == true || other == true) || email == '' ||pass == '' || !(cricket == true || music == true || travel == true)){
        errorOccur = true;
    }
    else{
        errorOccur = false;
    }
    return errorOccur;

}

function validate(){

    displayNone();
    let male = document.getElementById("male").checked;
    let female = document.getElementById("female").checked;
    let other = document.getElementById("other").checked;
    let cricket = document.getElementById("cricket").checked;
    let music = document.getElementById("music").checked;
    let travel = document.getElementById("traveling").checked;


    if(document.getElementById("firstname").value == ''){
        document.getElementById("validate-firstname").style.display = "block";
    }
    if(document.getElementById("lastname").value == ''){
        document.getElementById("validate-lastname").style.display = "block";
    }
    if(document.getElementById("address").value == ''){
        document.getElementById("validate-address").style.display = "block";
    }
    if(!(male == true || female == true || other == true)){
        document.getElementById("validate-gender").style.display = "block";
    }
    if(document.getElementById("email").value == ''){
        document.getElementById("validate-email").style.display = "block";
    }
    if(document.getElementById("password").value == ''){
        document.getElementById("validate-password").style.display = "block";
    }
    if(!(cricket == true || music == true || travel == true)){
        document.getElementById("validate-hobby").style.display = "block";
    }    
}

function displayNone(){
    document.getElementById("validate-firstname").style.display = "none";
    document.getElementById("validate-lastname").style.display = "none";
    document.getElementById("validate-address").style.display = "none";
    document.getElementById("validate-gender").style.display = "none";
    document.getElementById("validate-email").style.display = "none";
    document.getElementById("validate-password").style.display = "none";
    document.getElementById("validate-hobby").style.display = "none";
}

window.onload = addRow;