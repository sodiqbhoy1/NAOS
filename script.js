
var fullName = document.getElementById('name')
var gender = document.getElementById('gender')
var address = document.getElementById('address')
var phone = document.getElementById('phone')
var email = document.getElementById('email')
    
function submitButton(event){
    event.preventDefault()

    const userDetails = {
        fullName: fullName.value,
        gender: gender.value,
        address: address.value,
        phone: phone.value,
        email: email.value
    }



    console.log(userDetails)
}
