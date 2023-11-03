const queryString2 = window.location.search;
const urlParams2 = new URLSearchParams(queryString2);
const PROJECT_ID   = urlParams2.get('project')

if(!PROJECT_ID){
  alert("No project found")
}

const getProjectDetails = async ()=>{
    if(PROJECT_ID != null){
        document.title = PROJECT_ID;
    
    }

    const CATEGORY_PRODUCT_API = `https://fakestoreapi.com/products/${PROJECT_ID}`

  const response = await fetch(CATEGORY_PRODUCT_API)
    const data = response.json();

    data.then(json =>{

        console.log(json);
        
    })

    if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

}

getProjectDetails()
