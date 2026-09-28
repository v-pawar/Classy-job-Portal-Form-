// ======================================================
// 1. FORM ELEMENTS SELECT KARNA
// ======================================================

// Complete form ko select kar rahe hain
const jobform = document.getElementById("jobform");

// Name input
const nameinput = document.getElementById("name");

// Email input
const emailInput = document.getElementById("email");

// Country select
const countryInput = document.getElementById("country");

// Phone input
const phone = document.getElementById("phone");

// Position select
const positionInput = document.getElementById("position");

// Saare employment radio buttons select kar rahe hain
const employmentInputs = document.querySelectorAll('input[name="employment"]');

// Resume input
const resumeInput = document.getElementById("resume");

// ======================================================
// 2. SUCCESS POPUP ELEMENTS
// ======================================================

// Success popup
const popup = document.getElementById("successPopup");

// Popup ka OK button
const closePopup = document.getElementById("closePopup");

// OK button click hone par popup hide hoga
closePopup.addEventListener("click", function () {
  popup.style.display = "none";
});

// ======================================================
// 3. FORM SUBMIT EVENT
// ======================================================

jobform.addEventListener("submit", function (event) {
  // Browser ka default form submission stop karna
  event.preventDefault();

  console.log("SUBMIT EVENT WORKING");

  // ====================================================
  // 4. NAME VALIDATION
  // ====================================================

  // User ki name value lena
  // trim() beginning aur ending ke extra spaces remove karta hai
  const name = nameinput.value.trim();

  console.log("Name value:", name);

  // Name empty hai?
  if (name === "") {
    alert("Please enter your name");

    // Function ko yahin stop kar do
    return;
  }

  console.log("Name valid");

  // ====================================================
  // 5. EMAIL VALIDATION
  // ====================================================

  // Email ki value lena
  const email = emailInput.value.trim();

  // Email empty hai?
  if (email === "") {
    alert("Please enter your email");

    return;
  }

  // Basic email format check
  // Email mein @ aur . dono hone chahiye
  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email");

    return;
  }

  console.log("Email valid");

  // ====================================================
  // 6. PHONE VALIDATION
  // ====================================================

  // Phone number ki value lena
  const phoneNumber = phone.value.trim();

  // Phone empty hai?
  if (phoneNumber === "") {
    alert("Please enter your phone number");

    return;
  }

  // Phone exactly 10 characters ka hona chahiye
  if (phoneNumber.length !== 10) {
    alert("Phone number must be 10 digits");

    return;
  }

  console.log("Phone valid");

  // ====================================================
  // 7. COUNTRY VALIDATION
  // ====================================================

  // Selected country ki value lena
  const country = countryInput.value;

  // Country select nahi kiya?
  if (country === "") {
    alert("Please select your country");

    return;
  }

  console.log("Country valid");

  // ====================================================
  // 8. POSITION VALIDATION
  // ====================================================

  // Selected position ki value lena
  const position = positionInput.value;

  // Position select nahi kiya?
  if (position === "") {
    alert("Please select a position");

    return;
  }

  console.log("Position valid");

  // ====================================================
  // 9. EMPLOYMENT RADIO BUTTON VALIDATION
  // ====================================================

  // Initially empty rakhenge
  let employment = "";

  // Saare radio buttons ko check karenge
  employmentInputs.forEach(function (radio) {
    // Agar current radio selected hai
    if (radio.checked) {
      // Uski value employment variable mein store karo
      employment = radio.value;
    }
  });

  // Koi employment option select nahi hua?
  if (employment === "") {
    alert("Please select your employment status");

    return;
  }

  console.log("Employment valid:", employment);

  // ====================================================
  // 10. FORM DATA OBJECT
  // ====================================================

  // Ab saari validation successful hai
  // Isliye final application object create karenge

  const formData = {
    name: name,

    email: email,

    phone: phoneNumber,

    country: country,

    position: position,

    employment: employment,

    // Resume selected hai to filename store hoga
    // Resume nahi hai to empty string store hoga
    resume: resumeInput.files[0]?.name || "",
  };

  console.log("New Application:", formData);

  // ====================================================
  // 11. EXISTING APPLICATIONS GET KARNA
  // ====================================================

  // localStorage se existing applications retrieve karna
  const savedApplications = localStorage.getItem("applications");

  console.log("result ", savedApplications);

  // ====================================================
  // 12. EXISTING DATA KO ARRAY MEIN CONVERT KARNA
  // ====================================================

  let applications;

  // Agar applications already localStorage mein hain
  if (savedApplications) {
    // JSON string → JavaScript Array
    applications = JSON.parse(savedApplications);
  } else {
    // First application hai
    // Isliye empty array create karo
    applications = [];
  }

  // ====================================================
  // 13. NEW APPLICATION ARRAY MEIN ADD KARNA
  // ====================================================

  // New formData ko applications array ke end mein add karo
  applications.push(formData);

  console.log("All Applications:", applications);

  // ====================================================
  // 14. UPDATED ARRAY LOCALSTORAGE MEIN SAVE KARNA
  // ====================================================

  // JavaScript Array → JSON String
  // Then localStorage mein save
  localStorage.setItem("applications", JSON.stringify(applications));

  // ====================================================
  // 15. SUCCESS POPUP FLAG
  // ====================================================

  // Page reload ke baad popup show karne ke liye
  localStorage.setItem("showSuccess", "true");

  // ====================================================
  // 16. PAGE RELOAD
  // ====================================================

  location.reload();
});

// ======================================================
// 17. PAGE RELOAD KE BAAD SUCCESS POPUP SHOW KARNA
// ======================================================

// localStorage se popup flag read karna
const showSuccess = localStorage.getItem("showSuccess");

if (showSuccess === "true") {
  // Popup show karo
  popup.style.display = "flex";

  // Flag remove karo
  // Taaki normal refresh par popup dobara na aaye
  localStorage.removeItem("showSuccess");

  // 2 seconds ke baad popup automatically hide hoga
  setTimeout(function () {
    popup.style.display = "none";
  }, 2000);
}

// ======================================================
// DASHBOARD LOGIC START
// ======================================================

const deleteAllBtn = document.getElementById("deleteAllBtn");

const applicationsList = document.getElementById("applicationsList");

console.log("Applications List:", applicationsList);

const dashboardData = localStorage.getItem("applications");

console.log("Dashboard Data:", dashboardData);

const applications = JSON.parse(dashboardData);

console.log("Applications Array:", applications);

applications.forEach(function (application, index) {
  applicationsList.innerHTML += `
    <div class="application-card">

      <h3>${application.name}</h3>

      <p>Email: ${application.email}</p>
      <p>Phone: ${application.phone}</p>
      <p>Country: ${application.country}</p>
      <p>Position: ${application.position}</p>
      <p>Employment: ${application.employment}</p>
      <p>Resume: ${application.resume}</p>

      <button class="delete-btn" data-index="${index}">
        Delete
      </button>

    </div>
  `;
});

const applicationcount = document.getElementById("applicationCount");

applicationcount.innerText = `Total Application : ${applications.length}`;

const deleteButtons = document.querySelectorAll(".delete-btn");

console.log("Delete Buttons:", deleteButtons);

deleteButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const index = Number(button.dataset.index);

    console.log("Index:", index);
    console.log("Type:", typeof index);

    // Array se application delete karo
    applications.splice(index, 1);

    console.log("After Delete:", applications);

    // Updated array ko LocalStorage me save karo
    localStorage.setItem("applications", JSON.stringify(applications));
    location.reload();
  });
});

deleteAllBtn.addEventListener("click", function () {
  const confirmDelete = confirm(
    "Are you sure you want to delete all applications?",
  );

  if (confirmDelete) {
    localStorage.removeItem("applications");

    location.reload();
  }
});
