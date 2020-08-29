
 let date = new Date();

 let currentdate=parseInt(date.getFullYear());
const state = {};
		const elements = {
    searchForm: document.querySelector('#search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
     searchResList: document.querySelector('.ch_data_head'),
     select1:document.querySelector('#select1'),
     select2:document.querySelector('#select2'),
     filterbtn:document.querySelector('.filter_ico'),
     nxtbtn:document.querySelector('.next'),
     prevbtn:document.querySelector('.prev'),
    
   
};

let sortdata=[];
let sortdata1=[];

let sortspices=[];
let sortgender=[];



const renderSpices = spices => {
    const markup = `
    <div class="col-xs-6 col-md-3 chdta padding">
    <div class="data_spices">
    <img src="${spices.image}" alt="${spices.name}">
        <div class="clearboth"></div>

        <div class="data_in">
            <h2>${spices.name}<br>
            <span>Id ${spices.id} - Created ${parseInt(spices.created.substring(0,4))-currentdate} Years back</span>
            </h2>

            <div class="spices_data">
                <div class="spices_data_title">
                    Status
                </div>
                <div class="spices_data_dt">
                ${spices.status}
                </div>
                <div class="clearboth"></div>
            </div>
            <div class="spices_data">
                <div class="spices_data_title">
                    Spices
                </div>
                <div class="spices_data_dt">
                ${spices.species}
                </div>
                <div class="clearboth"></div>
            </div>
            <div class="spices_data">
                <div class="spices_data_title">
                   Gender
                </div>
                <div class="spices_data_dt">
                ${spices.gender}
                </div>
                <div class="clearboth"></div>
            </div>

            <div class="spices_data">
                <div class="spices_data_title">
                    Origin
                </div>
                <div class="spices_data_dt">
                ${spices.origin.name}
                </div>
                <div class="clearboth"></div>
            </div>
            <div class="spices_data">
                <div class="spices_data_title">
                  Last Location
                </div>
                <div class="spices_data_dt">
                ${spices.location.name}
                </div>
                <div class="clearboth"></div>
            </div>


        </div>

</div>
</div>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const renderResults = (spc) => {
    // render results of currente page
   

    spc.forEach(renderSpices);

    // render pagination buttons
    
};


/* function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] < b[prop]) {    
            return -1;    
        } else if (a[prop] > b[prop]) {    
            return 1;    
        }    
        return 0;    
    }    
} */

/* function SortByID(x,y) {
    return ((x.id == y.id) ? 0 : ((x.id > y.id) ? 1 : -1 ));
  } */

/*   function SortByID(x,y) {
    return y.ID - x.ID; 
  } */

const getInput = () => elements.searchInput.value;
const getInputBYspices = () => elements.select2.value;
const getInputBYgender = () => elements.select1.value;



class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(`https://rickandmortyapi.com/api/character/?name=${this.query}`);
            
            this.result = res.data.results;

            sortdata=this.result;
            
           if(this.result==0)
		   {alert("data not found");
		   }
		   else
		   
		   {
           console.log(this.result);
          
		   }
        } catch (error) {
            alert(error);
        }
    }

    async getResultsSpices() {
        try {
            const res = await axios(`https://rickandmortyapi.com/api/character/?species=${this.query}`);
            this.result = res.data.results;

            sortspices=this.result;
           if(this.result==0)
		   {alert("data not found");
		   }
		   else
		   
		   {
           console.log(this.result);
          
		   }
        } catch (error) {
            alert(error);
        }
        
    }

    async getResultsGender() {
        try {
            const res = await axios(`https://rickandmortyapi.com/api/character/?gender=${this.query}`);
            this.result = res.data.results;

            sortgender=this.result;
           if(this.result==0)
		   {alert("data not found");
		   }
		   else
		   
		   {
           console.log(this.result);
          
		   }
        } catch (error) {
            alert(error);
        }
    }
}
    

const controlSearch = async () => {
    // 1) Get query from view
    const query =  getInput();

    if (query) {
        // 2) New search object and add to state

        elements.searchResList.innerHTML = '';
        elements.nxtbtn.style.display="none";
        elements.prevbtn.style.display="none";
        state.search = new Search(query);

        // 3) Prepare UI for results
       
        //renderLoader(elements.searchRes);

        try {
            
           
            await state.search.getResults();
            
            
            // 5) Render results on UI
           
          renderResults(state.search.result);
        } catch (err) {
            alert('NO data Found...');
          
        }
    }
}

	
	
	elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});



const getBySpices = async () => {
    // 1) Get query from view
    const query =  getInputBYspices();

    if (query) {
        // 2) New search object and add to state
        elements.nxtbtn.style.display="none";
        elements.prevbtn.style.display="none";

        elements.searchResList.innerHTML = '';
        state.search = new Search(query);

        // 3) Prepare UI for results
       
        //renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResultsSpices();
    
            // 5) Render results on UI
           
          renderResults(state.search.result);
        } catch (err) {
            alert('NO data Found...');
          
        }
    }
}

const getByGender = async () => {
    // 1) Get query from view
    const query =  getInputBYgender();

    if (query) {
        // 2) New search object and add to state

        elements.nxtbtn.style.display="none";
        elements.prevbtn.style.display="none";

        elements.searchResList.innerHTML = '';
        state.search = new Search(query);

        // 3) Prepare UI for results
       
        //renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResultsGender();
    
            // 5) Render results on UI
           
          renderResults(state.search.result);
        } catch (err) {
            alert('NO data Found...');
          
        }
    }
}



			 
			
		
		 async function getResults1() {


           
			
			
        try {
            const res = await axios(`https://rickandmortyapi.com/api/character/`);
           

            const data1= res.data.results;
          
            console.log(res);
           

            sortdata1=data1;
            

     
            renderResults(data1);

         
    

          


		}
		
		catch (error) {
            alert(error);
        }

        
        

        }

        let counter=1;

        async function getResults12() {


           
			
			
            try {
            
                const respage = await axios(`https://rickandmortyapi.com/api/character/?page=${counter}`);
    
               
                var pagecnt=respage.data.results;
    
                console.log(pagecnt);
    
                
                
    
         
                renderResults(pagecnt);
    
             
        
    
              
    
    
            }
            
            catch (error) {
                alert(error);
            }
    
            
            
    
            }
      


        elements.nxtbtn.addEventListener('click', e => {

            elements.searchResList.innerHTML = '';
          
          
            e.preventDefault();
           
            counter+=1;

            getResults12();

            
             if (counter>1)
            {
                elements.prevbtn.style.display="block";

            }
            else if (counter>=34)
            {elements.nxtbtn.style.display="none";}
         
          

        });

        elements.prevbtn.addEventListener('click', e => {

            elements.searchResList.innerHTML = '';
            
          
            e.preventDefault();
           
            counter-=1;

            getResults12();

            
             if (counter<=1)
            {
                elements.prevbtn.style.display="none";

            }
            else if (counter<34)
            {elements.nxtbtn.style.display="block";}
         
          

        });

       


        
elements.filterbtn.addEventListener('click', e => {
    e.preventDefault();
    elements.searchResList.innerHTML = '';
 



    let sortrev1=sortdata1.sort(function(a, b){
      
        if(a.id>b.id) 
        {
         return b.id - a.id;}
         return a.id-b.id;
       
         
     });
     renderResults(sortrev1);
    

/*    else if(getResultsGender)
{
     let sortrev2=sortgender.sort(function(a, b){
      
        if(a.id>b.id)
        {
         return b.id - a.id;}
         return a.id-b.id;
       
         
     });
     renderResults(sortrev2);
    }

    else if(getResultsSpices)
    {

     let sortrev3=sortspices.sort(function(a, b){
      
        if(a.id>b.id)
        {
         return b.id - a.id;}
         return a.id-b.id;
       
         
     });
     renderResults(sortrev3);
    } */

    


   
  
  
   
});
        
       
		
      
