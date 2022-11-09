function displaybuttons(){
    console.log("display buttons called")
    document.getElementById("cancelButton").style.visibility = "visible"
    document.getElementById("saveButton").style.visibility = "visible"   
}

function removeButtons(){
    document.getElementById("cancelButton").style.visibility = "hidden"
    document.getElementById("saveButton").style.visibility = "hidden"
}

function makeInputFieldsEditable(){
    document.getElementById("firstNameLabel").removeAttribute("readonly");
    document.getElementById("lastNameLabel").removeAttribute("readonly");
    document.getElementById("emailLabel").removeAttribute("readonly");
    document.getElementById("phonenumberLabel").removeAttribute("readonly");
    document.getElementById("birthdateLabel").removeAttribute("readonly");
    document.getElementById("genderLabel").removeAttribute("readonly");
}

function closeInputFields(){
    document.getElementById("firstNameLabel").setAttribute("readonly", true);
    document.getElementById("lastNameLabel").setAttribute("readonly", true);
    document.getElementById("emailLabel").setAttribute("readonly", true);
    document.getElementById("phonenumberLabel").setAttribute("readonly", true);
    document.getElementById("birthdateLabel").setAttribute("readonly", true);
    document.getElementById("genderLabel").setAttribute("readonly", true);
}

function updateUser(user){
    user.firstname = document.getElementById("firstNameLabel").value;
    user.lastname = document.getElementById("lastNameLabel").value;
    user.phonenumber = document.getElementById("phonenumberLabel").value
    user.email = document.getElementById("emailLabel").value;
    // user.birthdate = document.getElementById("birthdateLabel").value;
    user.gender = document.getElementById("genderLabel").value;
    console.log("de nieuwe user is :" + JSON.stringify(user))
}
