// Define the function to fetch and display user details
async function viewUserDetails(userId: string) {
    try {
        // Make an HTTP request to fetch the user details based on the user ID
        const response = await fetch(`http://localhost:5000/user/${userId}`);
        const userData = await response.json();

        // Update the user details in the HTML
        const h1Element = document.querySelector('h1') as HTMLHeadingElement;
        const pElement = document.querySelector('p') as HTMLParagraphElement;

        // Assuming your user object has 'first_name', 'last_name', and 'email' properties
        h1Element.textContent = `${userData.first_name} ${userData.last_name}`;
        pElement.textContent = userData.email;
    } catch (error) {
        console.error(error);
        // Handle errors as needed
    }
}

// Parse the user ID from the URL (replace '123' with the actual user ID)
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId = urlParams.get('user_id') as string;


    // Call the function to populate user details
    viewUserDetails(userId);

