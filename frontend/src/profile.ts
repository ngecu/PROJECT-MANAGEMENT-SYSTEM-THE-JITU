const fetchUserProfile = async (user_id: string) => {


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
      } else {
        console.error('Failed to fetch user profile data.');
      }
    } catch (error) {
      console.error('An error occurred while fetching user profile data:', error);
    }
  };
  
  
  const user_id2 = localStorage.getItem('user_id') as string; // You might need to adjust this depending on your token storage method
  fetchUserProfile(user_id2);
  