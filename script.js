var fullName = document.getElementById('name')
var gender = document.getElementById('gender')
var address = document.getElementById('address')
var phone = document.getElementById('phone')
var email = document.getElementById('email')
var errorMessage = document.getElementById('errorMessage')
var successMessage = document.getElementById('successMessage')
var usersTab = document.getElementById('usersTab')

var err = " All field must be filled!!!"

function submitButton(event) {
  event.preventDefault();

  if (
    fullName.value === "" ||
    gender.value === "" ||
    address.value === "" ||
    phone.value === "" ||
    email.value === ""
  ) {
    errorMessage.style.display = "block";
    errorMessage.innerHTML = err;

    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 3000);
  } else {
    // Fixed: Changed fullName to fullname to match backend expectation
    const userDetails = {
      fullname: fullName.value,  // Fixed: backend expects 'fullname', not 'fullName'
      gender: gender.value,
      address: address.value,
      phone: phone.value,
      email: email.value,
    };

    fetch("http://localhost:3100/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        // Fixed: Backend sends just 'message' for success, not 'success: true'
        if (data.message && !data.error) {
          successMessage.style.display = "block";
          successMessage.innerHTML = data.message;
          console.log(data.message);
          
          // Clear form fields after successful submission
          fullName.value = "";
          gender.value = "";
          address.value = "";
          phone.value = "";
          email.value = "";
          
          // Refresh the users list
          showUsers();

          setTimeout(() => {
            successMessage.style.display = "none";
          }, 3000);
        } else {
          errorMessage.style.display = "block";
          errorMessage.innerHTML = data.error || "Registration failed";
          console.log(data.error);

          setTimeout(() => {
            errorMessage.style.display = "none";
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Something went wrong. Please try again.";

        setTimeout(() => {
          errorMessage.style.display = "none";
        }, 3000);
      });
  }
}

// fetch users
function showUsers() {
    // Ask the server for the list of users
    fetch('http://localhost:3100/user/all-users')
        .then(res => res.json()) // Turn response into real data
        .then(data => {
            usersTab.innerHTML = ""; // Clear old list

            // Fixed: Updated to match the actual backend response structure
            if (data.success && data.users && data.users.length > 0) {
                // For each user, show their info
                data.users.forEach(user => {
                    const name = user.fullname || user.name || 'No Name';
                    const email = user.email || 'No Email';
                    const phone = user.phone || 'No Phone';
                    const gender = user.gender || 'N/A';
                    const address = user.address || 'No Address';

                    usersTab.innerHTML += `
                        <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; background-color: #f9f9f9;">
                            <h4 style="margin: 0 0 10px 0; color: #005B8F;">${name}</h4>
                            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                            <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
                            <p style="margin: 5px 0;"><strong>Gender:</strong> ${gender}</p>
                            <p style="margin: 5px 0;"><strong>Address:</strong> ${address}</p>
                        </div>
                    `;
                });
            } else {
                usersTab.innerHTML = `
                    <div style="text-align: center; padding: 20px; color: #666;">
                        <p>No TechRise Oyo participants found yet.</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            usersTab.innerHTML = `
                <div style="color: red; text-align: center; padding: 20px;">
                    ⚠️ Could not load users. Please check if the server is running.
                </div>
            `;
        });
}

// Call the function to fetch users when the page loads
showUsers();

    // https://naosbackend.onrender.com