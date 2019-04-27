let data = {
"test": "data"
};

let count = 0;

let chart = "police";
let discard = "Department Name";
let divider = 1;

function toggleSelected(id) {
    //delete selected class from all buttons
    let buttons = document.querySelectorAll("button");
    console.log(buttons);
    for (button of buttons){
        button.classList.remove("inputs-button-selected");
    }
    console.log(buttons);
    //add selected class to button that was clicked
    let selection = document.querySelector('#' + id);
    console.log("my selection is:", selection);
    selection.classList.toggle("inputs-button-selected");
    // change chart variable to reflect which button was clicked
    if (id === "police") {
        chart = "police";
        console.log(chart);
    } else if (id === "oakland") {
        chart = "oakland";
        console.log(chart);
    } else if (id === "compare") {
        chart = "compare";
        console.log(chart);
    }
    //clear info from last chart
    let bars = document.querySelectorAll(".chart-center-bar");
    for (bar of bars){
        bar.remove();
    }
    let labels = document.querySelectorAll(".chart-category");
    for (label of labels){
        label.remove();
    }
    count = 0;
    render();
}

function render () {
    //selecting the data
    if (chart === "police") {
        discard = "Department Name";
        divider = 1;
    } else if (chart === "oakland") {
        discard = "Spending Category";
        divider = 3;
    } else if (chart === "compare") {
        discard = null;
        divider = 3;
    }
    // getting the data
    fetch("./data/combined_spending.json")
        .then(response => response.json())
            .then(data => {
                console.log("Got the data!");
                console.log(data);
                for (let category of data) {
                    if (category[ 'Category Type' ] === discard){
                        console.log('discard', discard);
                    } else if (chart ==="compare" && category['forget'] === true){
                        console.log("forgot:", category[ 'Label' ]);
                    } else {
                        //creating bars for each category
                        let chartbody = document.querySelector(".chart-center");
                        let bar = document.createElement("div");
                        bar.classList.add("chart-center-bar");
                        console.log("chart:", chart);
                        if (category['Category Type'] === "Spending Category") {
                            console.log("making a blue bar!");
                            bar.classList.add("chart-center-bar-police");
                        }
                        if (chart === 'compare' && category['Label'] === "Police Department") {
                            console.log("making a blue bar!");
                            bar.classList.add("chart-center-bar-police");
                        }
                        if (category[ 'value in millions of dollars' ] < (6*divider)){
                            bar.style.height = 6 + "%";
                        } else {
                            bar.style.height = (category[ 'value in millions of dollars' ] /divider)+ "%";
                        }
                        bar.textContent = '$' + category[ 'value in millions of dollars' ]
                        console.log(bar);
                        // to reverse the order of bars
//                        chart.insertBefore(bar, chart.childNodes[0]);
                        chartbody.append(bar);
                        console.log("added bar");
                        count+=1;
                        
                        // place titles for each bar
                        let axis = document.querySelector(".chart-x-axis");
                        let label = document.createElement("div");
                        label.classList.add("chart-category");
                        label.textContent = category[ 'Label' ]
                        console.log(label);
                        axis.append(label);
                        console.log("added label");
                        
                    }
                } 
                //set column number in css grid
                console.log('count is at:', count);
                let page = document.querySelector(".page");
                page.style.setProperty('--column-num', count)
    });
};

render();
