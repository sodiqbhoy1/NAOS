
var fullName = document.getElementById('name')
var gender = document.getElementById('gender')
var address = document.getElementById('address')
var phone = document.getElementById('phone')
var email = document.getElementById('email')
var errorMessage = document.getElementById('errorMessage')
var successMessage = document.getElementById('successMessage')

var err = " All field must be filled!!!"
var succ = " Registration successfull"
    
function submitButton(event){
    event.preventDefault()

    if(fullName.value =="" || gender.value=="" || address.value=="" || phone.value =="" || email.value =="" ){
        errorMessage.style.display="block"
        errorMessage.innerHTML = err

        setTimeout(() => {
        errorMessage.style.display="none"
            
        }, 3000);

    }

    else{
        const userDetails = {
            fullName: fullName.value,
            gender: gender.value,
            address: address.value,
            phone: phone.value,
            email: email.value
        }
        successMessage.style.display="block"
        successMessage.innerHTML = succ 
    
         setTimeout(() => {
            successMessage.style.display="none"
                
            }, 3000);

    }
}
