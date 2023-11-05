// Define a function to populate user details in the HTML
function populateUserDetails(userData:any) {
  const h1Element = document.querySelector('h1') as HTMLHeadingElement;
  const pElement = document.querySelector('p') as HTMLParagraphElement;

  // Assuming your user object has 'first_name', 'last_name', and 'email' properties
  h1Element.textContent = `${userData.first_name} ${userData.last_name}`;
  pElement.textContent = userData.email;
}

const fetchUserProfile = async (user_id:string) => {
  try {
    const response = await fetch(`http://localhost:5000/user/user_profile/${user_id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
    });

    if (response.ok) {
      const userData = await response.json();
      console.log(userData);
      // Populate the user details in the HTML
      populateUserDetails(userData);
    } else {
      console.error('Failed to fetch user profile data.');
    }
  } catch (error) {
    console.error('An error occurred while fetching user profile data:', error);
  }
};

const user_id2 = localStorage.getItem('user_id') as string; // You might need to adjust this depending on your token storage method
fetchUserProfile(user_id2);
